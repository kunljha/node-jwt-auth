const User = require('../models/User')

const signup_get = (req, res) => {
	res.render('signup')
}

const signup_post = async (req, res) => {
	const { email, password } = req.body

	try {
		const user = await User.create({ email, password })
		res.status(201).json(user)
	} catch (err) {
		res.send('user not able to sign up')
		console.log(err)
	}
}

const login_get = (req, res) => {
	res.render('login')
}

const login_post = (req, res) => {
	const { user, password } = req.body
}

module.exports = { signup_get, signup_post, login_get, login_post }
