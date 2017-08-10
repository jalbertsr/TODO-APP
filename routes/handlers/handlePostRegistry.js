const fs = require('fs')

function handlePostRegistry (req, res) {
  const { email, password } = req.body
  const data = '\r\n' + email + ':' + password

  fs.appendFile('./data-db/users_txt.txt', data, function (err) {
    if (err) throw err
    console.log('------ New registry ------')
    console.log('email: ' + email)
    console.log('password: ' + password)
    console.log('--------------------------')
    res.redirect('/')
  })
}

module.exports = handlePostRegistry
