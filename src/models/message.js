const mongoose = require('mongoose')

const messageSchema = mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		from: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
		// to: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'user',
		// },
		chat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'chat',
		},
	},
	{
		timestamps: true,
	},
)

module.exports = mongoose.model('message', messageSchema)
