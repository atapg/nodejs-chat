const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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
		avatarColor: {
			type: String,
			default: '#' + Math.floor(Math.random() * 16777215).toString(16),
		},
		chats: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'chat',
			},
		],
	},
	{
		timestamps: true,
	},
)

userSchema.pre('save', async function (next) {
	if (!this.isModified) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('user', userSchema)
