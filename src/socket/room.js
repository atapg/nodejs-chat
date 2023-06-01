const { userJoin } = require('./sockets')

const joinRoom = (socket, io, data) => {
	const user = userJoin(data._id, data.room)

	socket.join(data.room)
}

module.exports = { joinRoom }
