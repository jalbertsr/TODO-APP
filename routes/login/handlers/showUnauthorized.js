function showUnauthorized (req, res) {
  req.session.login ? res.redirect('/tasks/') : res.render('pages/unauthorized')
}

module.exports = showUnauthorized
