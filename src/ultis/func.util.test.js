const { updateFileExtension } = require('./func.util')

test('updateFileExtension("file.png","webp")', () => {
	expect(updateFileExtension('file.png', 'webp')).toBe('file.webp')
})
