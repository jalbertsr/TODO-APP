const fs = require('fs')

function removeTask (req, res) {
  const id = req.params.id
  req.session.tasks = req.session.tasks.filter(task => task.ID !== id)

  const dataFileName = './data-db/users_tasks/' + req.session.login.email + '.json'
  const dataTasks = {"tasks": req.session.tasks, "completed": req.session.completed}
  fs.writeFile(dataFileName, JSON.stringify(dataTasks), 'utf-8')

  res.status(200).send('ok delete')
}

module.exports = removeTask
