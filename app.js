require('dotenv').config()
const express = require('express')

// Server
const app = express()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`)
})
