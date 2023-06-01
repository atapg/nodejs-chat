const mongoose = require('mongoose')

const chatSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
		members: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'user',
		},
		admins: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'user',
		},
		type: {
			type: String,
			enum: ['private', 'group'],
			default: 'private',
		},
		lastMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'message',
		},
	},
	{
		timestamps: true,
	},
)

module.exports = mongoose.model('chat', chatSchema)
