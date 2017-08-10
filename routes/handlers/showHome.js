function showHome (req, res) {
  req.session.login ? res.render('pages/welcome', { userLogin: req.session.login }) : res.redirect('/login/')
}

module.exports = showHome
