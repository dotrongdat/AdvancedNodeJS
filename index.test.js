const request = require('supertest')
const app = require('./index')

describe('category route', () => {
	describe('get all', () => {
		it('category status should be true', async () => {
			const res = await request(app).get('/api/category')

			expect(res.statusCode).toBe(200)

			const { categories } = res.body.payload
			expect(categories.map((category) => category.status)).not.toContain(0)
		})
	})
})

describe('product route', () => {
	describe('get all', () => {
		it('product status should be true', async () => {
			const res = await request(app).get('/api/product')

			expect(res.statusCode).toBe(200)

			const { products } = res.body.payload
			expect(products.map((product) => product.status)).not.toContain(0)
		})
	})
})

afterAll(() => {
	app.close()
})
