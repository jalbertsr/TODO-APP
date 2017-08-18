const express = require('express')
const router = express.Router()

const removeTask = require('./task/handlers/removeTask')
const updateTask = require('./task/handlers/updateTask')
const createTask = require('./task/handlers/createTask')
const editTask = require('./task/handlers/editTask')
const handlePutTasks = require('./tasks/handlers/handlePutTasks')

const showTasks = require('./tasks/handlers/showTasks')
const showCompletedTasks = require('./tasks/handlers/showCompletedTasks')
const showLogin = require('./login/handlers/showLogin')
const showRegistry = require('./registry/handlers/showRegistry')
const showUnauthorized = require('./login/handlers/showUnauthorized')

const handlePostRegistry = require('./registry/handlers/handlePostRegistry')
const handlePostLogin = require('./login/handlers/handlePostLogin')
const handleLogout = require('./logout/handlers/handleLogout')

router.get('/', (req, res) => {
  res.redirect('/login/')
})

router.delete('/task/:id', removeTask)
router.put('/task/:id', updateTask)
router.put('/edit/', editTask)
router.post('/tasks/', createTask)
router.put('/tasks/:ids', handlePutTasks)

router.get('/tasks/', showTasks)
router.get('/completed/', showCompletedTasks)

router.get('/login/', showLogin)
router.get('/registry/', showRegistry)
router.get('/error/', showUnauthorized)

router.post('/registry/', handlePostRegistry)
router.post('/login/', handlePostLogin)
router.get('/logout/', handleLogout)

module.exports = router
