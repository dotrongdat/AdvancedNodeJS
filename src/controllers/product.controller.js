const productService = require('../services/product.service')
const inventoryService = require('../services/inventory.service')
const { StatusCodes } = require('http-status-codes')
const { storageBucketPath } = require('../constants/firebase.constant')
const { uploadFileToFireBase } = require('../ultis/firebase.util')
const { startSession } = require('mongoose')

const get = async (req, res) => {
	try {
		res.status(StatusCodes.OK).json({
			payload: { products: await productService.get() },
			message: 'Get successfully',
		})
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: 'Error in Server',
		})
	}
}

const create = async (req, res) => {
	const session = await startSession()
	try {
		let {
			brand,
			category,
			code,
			description,
			name,
			price,
			specs = [],
			images = [],
			quantity,
		} = req.body

		const { files = [], payload = {} } = req
		const time = String(Date.now())

		files.forEach((file, index) => {
			const filename = time + index + '.' + file.originalname.split('.').pop()
			images.push(storageBucketPath + '/' + filename)
		})

		session.startTransaction()

		payload.product = await productService.create({
			brand,
			category,
			code,
			description,
			name,
			price: parseFloat(price),
			specs,
			images,
		})
		await inventoryService.create({
			code,
			product: payload.product._id,
			quantity: parseInt(quantity),
		})
		await Promise.all([
			files.map((file, index) => {
				const filename = time + index + '.' + file.originalname.split('.').pop()
				return uploadFileToFireBase(file, filename)
			}),
		])

		await session.commitTransaction()

		res.status(StatusCodes.OK).json({
			payload,
			message: 'Create successfully',
		})
	} catch (error) {
		await session.abortTransaction()
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: 'Error in Server',
		})
	} finally {
		session.endSession()
	}
}

module.exports = {
	get,
	create,
}
