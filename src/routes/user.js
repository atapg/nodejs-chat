const { registerUser, loginUser } = require('../controllers/user')

const route = require('express').Router()

route.post('/register', registerUser)
route.post('/login', loginUser)

module.exports = route
