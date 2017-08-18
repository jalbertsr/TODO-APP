const Task = require('../../../data-db/models/Task')

function showTasks (req, res) {
  if (req.session.login) {
    Task.find({done: false})
      .then(tasks => res.render('pages/tasks', { tasks }))
      .catch(() => res.redirect('tasks/'))
  } else res.redirect('/error/')
}

module.exports = showTasks
