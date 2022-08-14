const { updateFileExtension } = require('./anonymous.util')

test('updateFileExtension("file.png","webp")', () => {
	expect(updateFileExtension('file.png', 'webp')).toBe('file.webp')
})
