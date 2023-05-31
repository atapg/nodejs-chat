const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		groups: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'group',
		},
	},
	{
		timestamps: true,
	},
)

module.exports = mongoose.model('user', userSchema)
