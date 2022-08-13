const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.SECRET_KEY
const expiresIn = process.env.EXPIRES_IN
const refreshExpiresIn = process.env.REFRESH_EXPIRES_IN

const refresh = (token, refreshToken) => {
	const tokenDecode = jwt.verify(token, secretKey, { ignoreExpiration: true })
	const refreshDecode = jwt.verify(refreshToken, secretKey)
	if (tokenDecode.toString() === refreshDecode.toString()) {
		delete tokenDecode['iat']
		delete tokenDecode['exp']
		const renewToken = sign(tokenDecode)
		const renewRefreshToken = sign_refresh(tokenDecode)
		return { token: renewToken, refreshToken: renewRefreshToken, _id: tokenDecode._id }
	}

	return null
}
const sign = (model) => jwt.sign(model, secretKey, { expiresIn })
const sign_refresh = (model) => jwt.sign(model, secretKey, { expiresIn: refreshExpiresIn })
const verify = (token, optional = { ignoreExpiration: false }) =>
	jwt.verify(token, secretKey, optional)

module.exports = {
	refresh,
	sign,
	sign_refresh,
	verify,
}
