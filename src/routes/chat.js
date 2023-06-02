const authentication = require('../middlewares/authentication')
const {
	getChatMessages,
	createChat,
	getMembers,
} = require('../controllers/chat')
const route = require('express').Router()

route.get('/messages/:id', authentication, getChatMessages)
route.post('/', authentication, createChat)
route.get('/members', authentication, getMembers)

module.exports = route
