const express = require('express')
const router = express.Router()
const strftime = require('strftime')
const fs = require('fs')

const showLogin = require('./handlers/showLogin')
const handlePostLogin = require('./handlers/handlePostLogin')
const removeTask = require('./task/handlers/removeTask')
const updateTask = require('./task/handlers/updateTask')
const showUnauthorized = require('./handlers/showUnauthorized')
const handleLogout = require('./handlers/handleLogout')
const showRegistry = require('./handlers/showRegistry')
const handlePostRegistry = require('./handlers/handlePostRegistry')

router.get('/', (req, res) => {
  res.redirect('/login/')
})

router.get('/login/', showLogin)
router.post('/login/', handlePostLogin)
router.delete('/task/:id', removeTask)
router.put('/task/:id', updateTask)
router.get('/error/', showUnauthorized)
router.get('/logout/', handleLogout)
router.get('/regist/', showRegistry)
router.post('/regist/', handlePostRegistry)

/*------------------- modularizar tasks ------------- */
router.get('/tasks/', (req, res) => {
  req.session.login ? res.render('pages/tasks', { tasks: req.session.tasks }) : res.redirect('/error/')
  // res.render('pages/tasks', { tasks: req.session.tasks })
})

router.get('/completed/', (req, res) => {
  req.session.login ? res.render('pages/completed', { completed: req.session.completed }) : res.redirect('/error/')
 // res.render('pages/completed', { completed: req.session.completed })
})

router.post('/tasks/', (req, res) => {
  const taskName = req.body.task
  const date = strftime('%B %d, %Y %H:%M', new Date())
  const createId = () => '_' + Math.random().toString(36).substr(2, 9)
  const newTask = {name: `${taskName}`, time: `(Created at: ${date})`, ID: createId()}
  req.session.tasks.push(newTask)
  console.log(req.session.tasks)
  console.log('req.session.login: ->', req.session.login.email)
  const dataFileName = './data-db/users_tasks/' + req.session.login.email + '.json'
  const dataTasks = {"tasks": req.session.tasks, "completed": req.session.completed}
  fs.writeFile(dataFileName, JSON.stringify(dataTasks), 'utf-8')
  res.redirect('/tasks/')
})




router.put('/tasks/:ids', (req, res) => {
  const idsArray = req.params.ids.split(',')

  for (let i = 0; i < idsArray.length; i++) {
    for (let j = 0; j < req.session.tasks.length; j++) {
      if (idsArray[i] === req.session.tasks[j].ID) {
        req.session.completed.push(req.session.tasks[j])
        req.session.tasks.splice(j, 1)
      }
    }
  }

  const dataFileName = './data-db/users_tasks/' + req.session.login.email + '.json'
  const dataTasks = {"tasks": req.session.tasks, "completed": req.session.completed}
  fs.writeFile(dataFileName, JSON.stringify(dataTasks), 'utf-8')

  res.status(200).send('ok checkboxes done')
})

router.put('/edit/', (req, res) => {
  const newName = req.body.name
  const editedID = req.body.ID

  for (let i = 0; i < req.session.tasks.length; i++) {
    if (req.session.tasks[i].ID === editedID) {
      req.session.tasks[i].name = newName
    }
  }

  const dataFileName = './data-db/users_tasks/' + req.session.login.email + '.json'
  const dataTasks = {"tasks": req.session.tasks, "completed": req.session.completed}
  fs.writeFile(dataFileName, JSON.stringify(dataTasks), 'utf-8') 
  res.status(200).send('ok edit done')
})

module.exports = router
