const route = require('express').Router()
const { get, create } = require('../../controllers/product.controller')
const { processBeforeUpload } = require('../../middlewares/processImage.middleware')

const multer = require('multer')({
	fileFilter: (req, file, cb) => {
		return cb(null, file.mimetype.startsWith('image/'))
	},
})

route.get('/', get)
route.post('/', [multer.array('images'), processBeforeUpload], create)

module.exports = route
