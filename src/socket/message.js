const Message = require('../models/message')

const sendMessage = async (socket, io, data) => {
	// save msg to db
	try {
		const msg = await Message.create({
			content: data.msg,
			from: data._id,
			chat: data.room,
		})

		io.to(data.room).emit('msg', data.msg)
	} catch (e) {
		console.log('error')
	}
}

module.exports = { sendMessage }
