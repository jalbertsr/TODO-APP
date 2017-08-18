const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')
var flash = require('express-flash')

const routes = require('./routes/')

const app = express()
const PORT = process.env.PORT || 3000
const URL_DB = process.env.URL_DB || `mongodb://admin:admin@ds047524.mlab.com:47524/tasksdb`
const createId = () => '_' + Math.random().toString(36).substr(2, 9)

mongoose.promise = Promise
mongoose.connect(URL_DB, {useMongoClient: true})

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieSession({
  name: 'LoginCookieSession',
  keys: [createId(), createId()],
  maxAge: 24 * 60 * 60 * 1000
}))

app.use(flash())

app.use((req, res, next) => {
  req.session.login = req.session.login || ''
  next()
})

app.set('view engine', 'pug')
app.locals.pretty = true

app.use(routes)

app.listen(PORT)
console.log(`Listening on PORT ${PORT}...`)
