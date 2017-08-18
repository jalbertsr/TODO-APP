const Task = require('../../../data-db/models/Task')

function removeTask (req, res) {
  const { id } = req.params
  Task.findByIdAndRemove(id)
    .then(() => res.redirect('tasks/'))
    .catch(() => res.send(`FAIL!! Task w/ id ${id} was NOT removed`))
}

module.exports = removeTask
