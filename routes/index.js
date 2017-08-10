const express = require('express')
const router = express.Router()

const showLogin = require('./handlers/showLogin')
const handlePostLogin = require('./handlers/handlePostLogin')
const showHome = require('./handlers/showHome')
const showUnauthorized = require('./handlers/showUnauthorized')
const handleLogout = require('./handlers/handleLogout')
const showRegistry = require('./handlers/showRegistry')
const handlePostRegistry = require('./handlers/handlePostRegistry')

router.get('/', (req, res) => {
  res.redirect('/login/')
})

router.get('/login/', showLogin)
router.post('/login/', handlePostLogin)
router.get('/home/', showHome)
router.get('/error/', showUnauthorized)
router.get('/logout/', handleLogout)
router.get('/regist/', showRegistry)
router.post('/regist/', handlePostRegistry)

module.exports = router
