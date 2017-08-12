function handleLogout (req, res) {
  req.session.login = null
  res.redirect('/')
}

module.exports = handleLogout
