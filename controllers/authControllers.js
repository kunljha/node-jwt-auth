const signup_get = (req, res) => {
	res.render('signup')
}

const signup_post = (req, res) => {
	const { user, password } = req.body
	console.log(user, password)
	res.send('new signup')
}

const login_get = (req, res) => {
	res.render('login')
}

const login_post = (req, res) => {
	const { user, password } = req.body
	console.log(user, password)
	res.send('new login')
}

module.exports = { signup_get, signup_post, login_get, login_post }
