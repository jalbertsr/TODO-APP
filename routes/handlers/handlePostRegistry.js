const fs = require('fs')

function handlePostRegistry (req, res) {
  const { email, password } = req.body
  const dataToWrite = '\r\n' + email + ':' + password
  let existentUser = false

  fs.readFile('./data-db/users_txt.txt', 'utf-8', function (err, data) {
    if (err) throw err
    const usersArr = data.split('\r\n')
    usersArr.forEach((user) => {
      let [emailDB] = user.split(':')
      if (emailDB === email) {
        existentUser = true
        console.log('already in use')
      }
    })
  })

  if (existentUser) console.log('Email in use')
  else {
    fs.appendFile('./data-db/users_txt.txt', dataToWrite, function (err) {
      if (err) throw err
      console.log('------ New registry ------')
      console.log('email: ' + email)
      console.log('password: ' + password)
      console.log('--------------------------')
      res.redirect('/')
    })
  }
}

module.exports = handlePostRegistry
