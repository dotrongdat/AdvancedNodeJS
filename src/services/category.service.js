const { CATEGORY_STATUS } = require('../constants')
const category = require('../models/category.model')

const buildChild = (childCategories, rootMapCategories) => {
	const categories = []
	for (let index = 0; index < childCategories.length; index++) {
		const _category = rootMapCategories.get(String(childCategories[index]))
		if (_category.childCategories.length > 0)
			_category.childCategories = buildChild(_category.childCategories, rootMapCategories)
		categories.push(_category)
		rootMapCategories.delete(String(childCategories[index]))
	}
	return categories
}

const buildCategoryTreeFromMap = (rootMapCategories) => {
	for (const [_id, _category] of rootMapCategories) {
		rootMapCategories.set(_id, {
			..._category,
			childCategories: buildChild(_category.childCategories, rootMapCategories),
		})
	}
	return Array.from(rootMapCategories.values())
}

const get = async () => {
	const categories = await category.find({ status: 1 }).lean()
	return buildCategoryTreeFromMap(
		new Map(categories.map((_category) => [String(_category._id), _category]))
	)
}
const create = async ({ code, name }, session = undefined) => {
	return await category.create([{ code, name }], { session })
}
const update = async (_id, { code, name }, session = undefined) => {
	return await category.findByIdAndUpdate(_id, { code, name }, { new: true, session })
}

const updateStatus = async ({ _id, status }, session = undefined) => {
	const _category = await category.findByIdAndUpdate(_id, { status }, { new: true, session })
	const promiseArray = _category.childCategories.map((childId) =>
		category.findByIdAndUpdate(childId, { status }).lean()
	)
	await Promise.all(promiseArray)
	return _category
}

const appendChild = async (_id, childId, session = undefined) => {
	return await category.findByIdAndUpdate(
		_id,
		{ $push: { childCategories: childId } },
		{ new: true, session }
	)
}

const switchChild = async (srcId, destId, childId, session = undefined) => {
	return await Promise.all([
		category
			.findByIdAndUpdate(srcId, { $pull: { childCategories: childId } }, { new: true, session })
			.lean(),
		category
			.findByIdAndUpdate(destId, { $push: { childCategories: childId } }, { new: true, session })
			.lean(),
	])
}

module.exports = {
	get,
	create,
	update,
	appendChild,
	switchChild,
	updateStatus,
}
