const mongoose = require('mongoose')

const groupSchema = mongoose.Schema(
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
			ref: 'group',
		},
		admins: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'user',
		},
	},
	{
		timestamps: true,
	},
)

module.exports = mongoose.model('group', groupSchema)
