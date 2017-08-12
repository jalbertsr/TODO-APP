function showRegistry (req, res) {
  req.session.login ? res.redirect('/tasks/') : res.render('pages/registry')
}

module.exports = showRegistry
