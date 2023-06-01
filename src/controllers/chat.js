const User = require('../models/user')
const Chat = require('../models/chat')
const chat = require('../models/chat')

const getChats = async (req, res) => {
	try {
		// const chat = await Chat.create({
		// 	name: 'PHP',
		// 	owner: req.authenticatedUser._id,
		// 	members: [req.authenticatedUser._id],
		// 	admins: [req.authenticatedUser._id],
		// 	type: 'private',
		// })
		// await User.findByIdAndUpdate(req.authenticatedUser._id, {
		// 	$push: { chats: chat._id },
		// })
		const chats = await User.findById(req.authenticatedUser._id).populate(
			'chats',
		)
		return res.json({
			data: {
				chats: chats.chats,
			},
			status: 'success',
		})
	} catch (e) {
		console.log(e)
		return res.status(400).json({
			message: 'Something went wrong',
			status: 'failed',
		})
	}
}

module.exports = { getChats }
