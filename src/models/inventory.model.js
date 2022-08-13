const { Schema, model } = require('mongoose')

const reservationSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
})

const inventorySchema = new Schema(
	{
		code: {
			type: String,
			required: true,
		},
		product: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		reservations: [
			{
				type: reservationSchema,
				default: [],
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

module.exports = model('Inventory', inventorySchema)
