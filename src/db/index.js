const mongoose = require('mongoose')

const connect = () => {
	mongoose
		.connect(process.env.DB_URL, {
			replicaSet: 'atlas-xfqapd-shard-0',
		})
		.then((rs) => {
			console.log('Connect to Mongo successfully')
		})
		.catch((err) => console.log('Fail to connect to Mongo :::' + err))
}

module.exports = {
	connect,
}
