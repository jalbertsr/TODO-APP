const Task = require('../../../data-db/models/Task')

function createTask (req, res) {
  const { title } = req.body
  const task = new Task({ title })

  task.save()
    .then(() => res.redirect('/tasks/'))
    .catch(() => res.send(`FAIL to add task w/ id ${title}`))
}

module.exports = createTask
