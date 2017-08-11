function showHome (req, res) {
  req.session.login ? res.redirect('/tasks/') : res.redirect('/login/')
}

module.exports = showHome
