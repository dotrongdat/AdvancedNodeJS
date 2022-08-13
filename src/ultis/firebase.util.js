const firebaseAdmin = require('firebase-admin')
const { firebase_key, storageBucket, storageBucketPath } = require('../constants/firebase.constant')

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(firebase_key),
	storageBucket,
})

const bucket = firebaseAdmin.storage().bucket()

const uploadFileToFireBase = (file, fileName) =>
	new Promise((resolve, reject) => {
		const bucketFile = bucket.file(fileName)
		const stream = bucketFile.createWriteStream({
			metadata: {
				contentType: file.mimetype,
			},
		})
		stream.on('error', (e) => {
			reject(e)
		})
		stream.on('finish', async (e) => {
			await bucketFile.makePublic()
			resolve(`${storageBucketPath}/${fileName}`)
		})
		stream.end(file.buffer)
	})
const deleteFileFromFirebase = (fileName) =>
	new Promise((resolve, reject) => {
		const bucketFile = bucket.file(fileName)
		bucketFile
			.delete({ ignoreNotFound: true })
			.then((rs) => resolve(true))
			.catch((err) => reject(false))
	})

module.exports = {
	uploadFileToFireBase,
	deleteFileFromFirebase,
}
