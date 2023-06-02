require('dotenv').config()
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const { connection } = require('./src/socket/connection')
const { users } = require('./src/socket/sockets')
const { em } = require('./src/utils/event')

// Mongo DB
require('./src/config/mongodb')

// Server
const app = express()
const server = http.createServer(app)
const io = socketio(server, {
	cors: {
		origin: '*',
	},
})

// Middlewares and configs
app.use(bodyParser.json())
app.use(cors())

// Socket io
io.on('connection', socket => connection(socket, io))

em.on('newChats', data => {
	const usersNeedToBeNotified = []

	data.forEach(u => {
		users.forEach(user => {
			if (u === user._id) {
				usersNeedToBeNotified.push(user)
			}
		})
	})

	usersNeedToBeNotified.forEach(async u => {
		io.to(u.socketId).emit('chat', true)
	})
})

// Http Routes
app.use('/api/user/', require('./src/routes/user'))
app.use('/api/chat/', require('./src/routes/chat'))

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`)
})
