const fs = require('fs')
const strftime = require('strftime')

function handlePostLogin (req, res) {
  const { email, password } = req.body
  let autentification = false
  let usersArr

  fs.readFile('./data-db/users_txt.txt', 'utf-8', (err, data) => {
    if (err) throw err
    usersArr = data.split('\r\n') // (/\r?\n/)
    // console.log(usersArr)
    usersArr.forEach((user) => {
      let [emailDB, passDB] = user.split(':')
      if (emailDB === email && passDB === password) {
        autentification = true
        req.session.login = { email }
        console.log('------------ new login --------------')
        console.log('user: ' + email)
        console.log('pass: ' + password)
        console.log('logged at: ' + strftime('%F:%T', new Date()))
        console.log('-------------------------------------')
      }
    })

    autentification ? res.redirect('/home') : res.redirect('/error')
  })
}

module.exports = handlePostLogin
