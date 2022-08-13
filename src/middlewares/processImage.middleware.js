const { processImage } = require('../ultis/file.util')
const { StatusCodes } = require('http-status-codes')

const processBeforeUpload = async (req, res, next) => {
	try {
		if (req.files) {
			const files = [...req.files]
			for (let index = 0; index < files.length; index++) {
				await processImage(files[index])
			}
			req.files = files
		}
		next()
	} catch (error) {
		//loggin
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: 'Error in Server',
		})
	}
}

module.exports = {
	processBeforeUpload,
}
