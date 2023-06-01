const authentication = require('../middlewares/authentication')
const { getChatMessages } = require('../controllers/chat')
const route = require('express').Router()

route.get('/messages/:id', authentication, getChatMessages)

module.exports = route
