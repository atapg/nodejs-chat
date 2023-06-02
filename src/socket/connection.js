const { joinRoom } = require('./room')
const { sendMessage } = require('./message')
const { sendChats, getNewChats } = require('./chat')
const { addSocket, userLeave, users } = require('./sockets')
const { em } = require('../utils/event')

const connection = (socket, io) => {
	console.log('New connection')

	addSocket(socket.id, socket.handshake.query._id)

	// Send message only to the user
	// socket.emit('msg', 'Welcome!')

	// Send message to all users except the user itself
	// socket.broadcast.emit('msg', 'A new user connected to the chat room')

	// Send message to all users
	// io.emit("msg", "")

	// Sockets

	socket.on('joinRoom', data => joinRoom(socket, io, data))
	socket.on('msg', data => sendMessage(socket, io, data))
	socket.on('chat', data => sendChats(socket, io, data))
	socket.on('disconnect', () => console.log('Connection closed'))
}

module.exports = { connection }
