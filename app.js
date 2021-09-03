require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')

const app = express() // initialise express app

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs')

// database connection
const username = process.env.USER_NAME
const password = process.env.PASS_WORD
const database = process.env.DATA_BASE
const dbURI = `mongodb+srv://${username}:${password}@cluster0.rlzx9.mongodb.net/${database}`

mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then((result) => {
		app.listen(3000)
	})
	.catch((err) => {
		console.log(err)
	})

// routes
app.get('*', checkUser)

app.get('/', (req, res) => {
	res.render('home')
})

app.get('/smoothies', requireAuth, (req, res) => {
	res.render('smoothies')
})

app.use(authRoutes)
