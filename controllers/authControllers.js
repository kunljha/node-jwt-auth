const User = require('../models/User')

// handle errors
const handleErrors = (err) => {
	// console.log(Object.values(err.errors)) --> array
	// Object.values(err.errors).forEach((error) => {
	// 	console.log(error.properties.message)
	// })

	let errors = { email: '', password: '' }

	// duplicate error code
	if (err.code === 11000) {
		errors.email = 'That email already exists!'
		return errors
	}

	// validation error
	if (err.message.includes('user validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message
		})
	}

	return errors
}

const signup_get = (req, res) => {
	res.render('signup')
}

const signup_post = async (req, res) => {
	const { email, password } = req.body

	try {
		const user = await User.create({ email, password })
		res.status(201).json(user)
	} catch (err) {
		const errors = handleErrors(err)
		// res.status(400).send('user not able to sign-up')

		res.status(400).json(errors)
	}
}

const login_get = (req, res) => {
	res.render('login')
}

const login_post = (req, res) => {
	const { user, password } = req.body
}

module.exports = { signup_get, signup_post, login_get, login_post }
