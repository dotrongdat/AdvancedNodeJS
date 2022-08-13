const express = require('express')
const cors = require('cors')
const { connect } = require('./src/db')
const route = require('./src/routes')
const morgan = require('morgan')
const { createStream } = require('rotating-file-stream')
const { join, dirname } = require('path')
require('dotenv').config()

connect()
const app = express()
const port = process.env.PORT || 3001
const hostname = process.env.HOSTNAME || 'localhost'
const isProduction = process.env.NODE_ENV === 'production'

const accessLogStream = createStream('access.log', {
	interval: '1d',
	path: join(dirname(''), 'log'),
})
app.use(isProduction ? morgan('combined', { stream: accessLogStream }) : morgan('dev'))

app.use(cors())
app.use(express.json())
app.use(route)

app.listen(port, () => {
	console.log(`Server is running on ${hostname}:${port}`)
})
