const {
	registerUser,
	loginUser,
	getUserInfo,
	getChats,
} = require('../controllers/user')
const authentication = require('../middlewares/authentication')

const route = require('express').Router()

route.post('/register', registerUser)
route.post('/login', loginUser)
route.get('/', authentication, getUserInfo)
route.get('/chats', authentication, getChats)

module.exports = route
