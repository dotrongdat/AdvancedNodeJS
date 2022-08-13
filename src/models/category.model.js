const { Schema, model } = require('mongoose')
const { CATEGORY_STATUS } = require('../constants')

const categorySchema = new Schema(
	{
		code: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		childCategories: [
			{
				type: Schema.Types.ObjectId,
				default: [],
			},
		],
		status: {
			type: Number,
			required: true,
			default: CATEGORY_STATUS.active,
		},
	},
	{
		timestamps: {
			createdAt: true,
			updatedAt: true,
		},
	}
)

module.exports = model('Category', categorySchema)
