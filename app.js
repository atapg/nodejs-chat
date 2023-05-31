require('dotenv').config()
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const { connection } = require('./src/socket/connection')

// Mongo DB
require('./src/config/mongodb')

// Server
const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Socket io
io.on('connection', socket => connection(socket, io))

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`)
})
