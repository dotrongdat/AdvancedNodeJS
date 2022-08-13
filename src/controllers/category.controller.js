const { StatusCodes } = require('http-status-codes')
const categoryService = require('../services/category.service')
const { startSession } = require('mongoose')

const get = async (req, res) => {
	try {
		res.status(StatusCodes.OK).json({
			payload: { categories: await categoryService.get() },
			message: 'Get successfully v3',
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
		let { payload = {} } = req
		const { code, name, parentCategory } = req.body

		session.startTransaction()

		payload.category = await categoryService.create({ code, name }, session)
		if (parentCategory) {
			payload.parentCategory = await categoryService.appendChild(
				parentCategory,
				payload.category._id,
				session
			)
		}

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

const update = async (req, res) => {
	const session = await startSession()
	try {
		const { payload = {} } = req
		const { _id, code, name, parentCategory = undefined, newParentCategory = undefined } = req.body

		session.startTransaction()

		payload.category = await categoryService.update(_id, { code, name })
		if (parentCategory && newParentCategory) {
			payload.parentCategories = await categoryService.switchChild(
				parentCategory,
				newParentCategory,
				_id
			)
		}

		await session.commitTransaction()

		res.status(StatusCodes.OK).json({
			category: await categoryService.update(_id, { code, name }),
			message: 'Update successfully',
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
	update,
}
