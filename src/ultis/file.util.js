const sharp = require('sharp')

const processImage = (file) => {
	return new Promise((resolve, reject) => {
		sharp(file.buffer)
			.rotate()
			.resize(480, 360)
			.toFormat('webp')
			.toBuffer((err, buffer, info) => {
				if (err) reject(err)
				// console.log(info)
				file.buffer = buffer
				file.mimetype = `image/${info.format}`
				file.size = info.size
				file.originalname = file.originalname.replace(/\..+/, `.${info.format}`)
				resolve(buffer)
			})
	})
}

module.exports = {
	processImage,
}
