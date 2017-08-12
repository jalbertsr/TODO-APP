function showLogin (req, res) {
  req.session.login ? res.redirect('/tasks/') : res.render('pages/login')
}

module.exports = showLogin
