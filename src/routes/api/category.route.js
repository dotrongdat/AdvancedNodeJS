const route = require('express').Router()
const categoryController = require('../../controllers/category.controller')

route.get('/', categoryController.get)
route.post('/', categoryController.create)
route.put('/', categoryController.update)

module.exports = route
