function showTasks (req, res) {
  req.session.login ? res.render('pages/tasks', { tasks: req.session.tasks }) : res.redirect('/error/')
}

module.exports = showTasks
