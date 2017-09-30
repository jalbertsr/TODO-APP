const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

const routes = require('./routes/')

const app = express()
const PORT = process.env.PORT || 3000
const createId = () => '_' + Math.random().toString(36).substr(2, 9)

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieSession({
  name: 'LoginCookieSession',
  keys: [createId(), createId()],
  maxAge: 24 * 60 * 60 * 1000
}))

app.use((req, res, next) => {
  req.session.login = req.session.login || ''
  req.session.tasks = req.session.tasks || []
  req.session.completed = req.session.completed || []
  next()
})

app.set('view engine', 'pug')
app.locals.pretty = true

app.use(routes)

app.listen(PORT)
console.log(`Listening on PORT ${PORT}...`)
