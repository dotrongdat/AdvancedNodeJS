const inventory = require('../models/inventory.model')

const create = async ({ code, product, quantity }, session = undefined) => {
	return await inventory.create([{ code, product, quantity }], { session })
}

const updateQuantity = async ({ product, quantity }, session = undefined) => {
	return await inventory.findOneAndUpdate({ product }, { quantity }, { session })
}

const reserve = async ({ _id, user, quantity }, session = undefined) => {
	return await inventory.findByIdAndUpdate(
		_id,
		{ $push: { reservations: { user, quantity } } },
		{ new: true, session }
	)
}

module.exports = {
	create,
	updateQuantity,
	reserve,
}
