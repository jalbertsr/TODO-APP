function showCompletedTasks (req, res) {
  req.session.login ? res.render('pages/completed', { completed: req.session.completed }) : res.redirect('/error/')
}

module.exports = showCompletedTasks
