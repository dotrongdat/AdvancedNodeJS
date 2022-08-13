const route = require('express').Router()
const categoryRoute = require('./category.route')
const productRoute = require('./product.route')

route.use('/category', categoryRoute)
route.use('/product', productRoute)

module.exports = route
