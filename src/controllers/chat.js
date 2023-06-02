const User = require('../models/user')
const Chat = require('../models/chat')
const Message = require('../models/message')
const { sendChats } = require('../socket/sockets')
const { em } = require('../utils/event')

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

const getChatMessages = async (req, res) => {
	try {
		const maxShow = 20
		const page = req.query.page

		const startIndex = (Number(page) - 1) * Number(maxShow)

		const messages = await Message.find({
			chat: req.params.id,
		})
			.sort({ _id: -1 }) // get the latest
			.limit(Number(maxShow))
			.skip(startIndex)
			.populate({ path: 'from', select: 'username avatarColor' })

		res.json({
			data: messages,
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

const createChat = async (req, res) => {
	try {
		const { members, name } = req.body

		const chat = await Chat.create({
			name,
			owner: req.authenticatedUser._id,
			admins: [req.authenticatedUser._id],
			type: members.length === 1 ? 'private' : 'group',
			members: [req.authenticatedUser._id, ...members],
		})

		if (chat) {
			await User.findByIdAndUpdate(req.authenticatedUser._id, {
				$push: { chats: chat._id },
			})

			em.emit('newChats', members)

			members.forEach(async member => {
				await User.findByIdAndUpdate(member, {
					$push: { chats: chat._id },
				})
			})
		}

		// Send new chat notif to users

		res.json({
			data: chat,
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

const getMembers = async (req, res) => {
	try {
		let members = await User.find()

		res.json({
			data: members.filter(
				member =>
					member._id.toString() !== req.authenticatedUser._id.toString(),
			),
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

module.exports = { getChats, getChatMessages, createChat, getMembers }
