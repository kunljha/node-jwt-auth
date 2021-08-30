const express = require('express')
const mongoose = require('mongoose')
const { username, password, database } = require('./config')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')

const app = express() // initialise express app

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs')

// database connection
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
app.get('/', (req, res) => {
	res.render('home')
})
app.get('/smoothies', (req, res) => {
	res.render('smoothies')
})

app.use(authRoutes)
