const { joinRoom } = require('./room')
const { sendMessage } = require('./message')

const connection = (socket, io) => {
	console.log('New connection')

	// Send message only to the user
	// socket.emit('msg', 'Welcome!')

	// Send message to all users except the user itself
	// socket.broadcast.emit('msg', 'A new user connected to the chat room')

	// Send message to all users
	// io.emit("msg", "")

	// Sockets
	socket.on('joinRoom', data => joinRoom(socket, io, data))
	socket.on('msg', data => sendMessage(socket, io, data))
	socket.on('disconnect', () => console.log('Connection closed'))
}

module.exports = { connection }
