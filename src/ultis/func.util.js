const updateFileExtension = (filename, extension) => {
	return filename.replace(/\..+/, `.${extension}`)
}

module.exports = {
	updateFileExtension,
}
