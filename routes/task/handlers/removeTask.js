const path = require('path')
const writeFile = require(path.join(process.cwd(), './helpers/writeFile'))

function removeTask (req, res) {
  const id = req.params.id
  req.session.tasks = req.session.tasks.filter(task => task.ID !== id)
  writeFile(req)

  res.status(200).send('delete task succesful')
}

function removeTaskCompleted (req, res) {
  const id = req.params.id
  req.session.completed = req.session.completed.filter(task => task.ID !== id)
  writeFile(req)

  res.status(200).send('delete done task succesful')
}

module.exports = {removeTask, removeTaskCompleted}
