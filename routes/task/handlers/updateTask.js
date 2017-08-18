const Task = require('../../../data-db/models/Task')

function editTask (req, res) {
  const { title, id } = req.params

  Task.findByIdAndUpdate(id, {done: true})
    .then(() => res.redirect('tasks/'))
    .catch(() => res.send(`FAIL to add task w/ ${title}`))
}

module.exports = editTask
