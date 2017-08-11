const fs = require('fs')

function updateTask (req, res) {
  const id = req.params.id
  for (let i = 0; i < req.session.tasks.length; i++) {
    if (req.session.tasks[i].ID === id) {
      req.session.completed.push(req.session.tasks[i])
      req.session.tasks.splice(i, 1)
    }
  }
  const dataFileName = './data-db/users_tasks/' + req.session.login.email + '.json'
  const dataTasks = {"tasks": req.session.tasks, "completed": req.session.completed}
  fs.writeFile(dataFileName, JSON.stringify(dataTasks), 'utf-8')

  res.status(200).send('ok done')
}

module.exports = updateTask
