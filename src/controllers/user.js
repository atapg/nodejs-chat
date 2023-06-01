const validator = require('validator')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils/token')

const registerUser = async (req, res) => {
	try {
		const { username, password } = req.body

		if (!username || !password) {
			return res.status(400).json({
				message: 'Insufficient credentials',
				status: 'failed',
			})
		}

		if (!validator.isLength(password, { min: 8 })) {
			return res.status(400).json({
				message: 'Password length minimum length must be 8 characters',
				status: 'failed',
			})
		}

		if (!validator.matches(username, '^[a-zA-Z0-9_]*$')) {
			return res.status(400).json({
				message: 'Username is not valid',
				status: 'failed',
			})
		}

		// Duplicate username
		const isUserExists = await User.findOne({ username })

		if (isUserExists) {
			return res.status(400).json({
				message: 'Username already exists',
				status: 'failed',
			})
		}

		const user = await User.create({
			username,
			password,
		})

		if (!user) {
			return res.status(400).json({
				message: 'Something went wrong',
				status: 'failed',
			})
		}

		res.json({
			message: 'User registered successfully',
			status: 'success',
		})
	} catch (e) {
		return res.status(400).json({
			message: 'Something went wrong',
			status: 'failed',
		})
	}
}

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body

		if (!username || !password) {
			return res.status(400).json({
				message: 'Insufficient credentials',
				status: 'failed',
			})
		}

		const user = await User.findOne({ username })

		if (!user) {
			return res.status(400).json({
				message: 'Insufficient credentials',
				status: 'failed',
			})
		}

		const isPasswordMatches = await bcrypt.compare(password, user.password)

		if (!isPasswordMatches) {
			return res.status(400).json({
				message: 'Insufficient credentials',
				status: 'failed',
			})
		}

		user.password = undefined
		delete user.password

		res.json({
			data: {
				user,
				token: generateToken(user._id),
			},
			status: 'success',
		})
	} catch (e) {
		return res.status(400).json({
			message: 'Something went wrong',
			status: 'failed',
		})
	}
}

const getUserInfo = async (req, res) => {
	try {
		return res.json({
			data: {
				user: req.authenticatedUser,
			},
			status: 'success',
		})
	} catch (e) {
		return res.status(400).json({
			message: 'Something went wrong',
			status: 'failed',
		})
	}
}

module.exports = { registerUser, loginUser, getUserInfo }
