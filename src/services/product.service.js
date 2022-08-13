const product = require('../models/product.model')

const get = async () => {
	return await product.find({ status: 1 }).lean()
}

const create = async (
	{
		brand,
		category,
		code,
		description,
		images = [],
		// inventory,
		name,
		price,
		specs = [],
	},
	session = undefined
) => {
	return await product.create(
		{
			brand,
			category,
			code,
			description,
			images,
			// inventory,
			name,
			price,
			specs,
		},
		{ session }
	)
}

const update = async (
	_id,
	{
		brand,
		category,
		code,
		description,
		images,
		// inventory,
		name,
		price,
		specs,
		status,
	},
	session = undefined
) => {
	return await product.findByIdAndUpdate(
		_id,
		{
			brand,
			category,
			code,
			description,
			images,
			// inventory,
			name,
			price,
			specs,
			status,
		},
		{ session, new: true }
	)
}

module.exports = {
	get,
	create,
	update,
}
