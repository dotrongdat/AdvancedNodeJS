const { Schema, model } = require('mongoose')

const cartSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		products: [
			{
				product: {
					type: Schema.Types.ObjectId,
				},
				quantity: {
					type: Number,
				},
			},
		],
		status: {
			type: Number,
			required: true,
			default: 1,
		},
	},
	{
		timestamps: {
			createdAt: true,
			updatedAt: true,
		},
	}
)

module.exports = model('Cart', cartSchema)
