const users = []

function userJoin(id, username, room) {
	const user = { id, username, room }

	users.push(user)

	return user
}

function getCurrentUser(id) {
	return users.find(user => user._id === id)
}

function userLeave(id) {
	const index = users.findIndex(user => user.id === id)

	if (index !== -1) {
		return users.splice(index, 1)[0]
	}
}

function getRoomUsers(room) {
	return users.filter(user => user.room === room)
}

const addSocket = async (socketId, _id) => {
	users.push({ socketId, _id })
}

const sendChats = id => {
	// const socket = getCurrentUser(id)
}

module.exports = {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
	addSocket,
	sendChats,
	users,
}
