require('dotenv').config()
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const { connection } = require('./src/socket/connection')

// Mongo DB
require('./src/config/mongodb')

// Server
const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Middlewares and configs
app.use(bodyParser.json())
app.use(cors())

// Socket io
io.on('connection', socket => connection(socket, io))

// Http Routes
app.use('/api/user/', require('./src/routes/user'))

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`)
})
