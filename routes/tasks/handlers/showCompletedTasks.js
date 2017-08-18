const Task = require('../../../data-db/models/Task')

function showCompletedTasks (req, res) {
  if (req.session.login) {
    Task.find({done: true})
      .then(completed => res.render('pages/completed', { completed }))
      .catch()
  } else res.redirect('/error/')
}

module.exports = showCompletedTasks
