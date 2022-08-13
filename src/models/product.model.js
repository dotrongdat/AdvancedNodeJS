const { Schema, model } = require('mongoose')
const { PRODUCT_STATUS } = require('../constants')

const productSchema = new Schema(
	{
		code: {
			type: String,
			required: true,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
		},
		// inventory: {
		//     type: Schema.Types.ObjectId,
		//     ref: "Inventory"
		// },
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		images: [
			{
				type: String,
				default: [],
			},
		],
		status: {
			type: Number,
			required: true,
			default: PRODUCT_STATUS.active,
		},
		specs: [
			{
				type: Object,
				default: [],
			},
		],
	},
	{
		timestamps: {
			createdAt: true,
			updatedAt: true,
		},
	}
)

module.exports = model('Product', productSchema)
