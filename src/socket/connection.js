const { joinRoom } = require('./room')

const connection = (socket, io) => {
	console.log('New connection')

	// Send message only to the user
	// socket.emit('msg', 'Welcome!')

	// Send message to all users except the user itself
	// socket.broadcast.emit('msg', 'A new user connected to the chat room')

	// Send message to all users
	// io.emit("msg", "")

	// Sockets
	socket.on('joinRoom', data => joinRoom(socket, io,data))
}

module.exports = { connection }
