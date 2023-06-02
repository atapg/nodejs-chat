const Message = require('../models/message')

const sendMessage = async (socket, io, data) => {
	// save msg to db
	try {
		const msg = await Message.create({
			content: data.msg,
			from: data._id,
			chat: data.room,
		})

		await msg.populate({ path: 'from', select: 'username avatarColor' })

		io.to(data.room).emit('msg', msg)
	} catch (e) {
		console.log('error')
	}
}

module.exports = { sendMessage }
