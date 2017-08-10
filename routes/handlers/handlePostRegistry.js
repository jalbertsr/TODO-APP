const fs = require('fs')
const strftime = require('strftime')
const crypto = require('crypto')
const algorithm = 'aes-256-ctr'
const createId = () => '_' + Math.random().toString(36).substr(2, 9)
const cryptoPass = createId()

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
      }
    })
    if (existentUser) {
      console.log('Email already in use')
      res.redirect('/regist/')
    } else {
      fs.appendFile('./data-db/users_txt.txt', dataToWrite, function (err) {
        if (err) throw err
        console.log('------ New registry ------')
        console.log('email: ' + email)
        console.log('password: ' + password)
        console.log('registered at: ' + strftime('%F:%T', new Date()))
        console.log('--------------------------')
        res.redirect('/')
      })
    }
  })
}

function encrypt (text) {
  let cipher = crypto.createCipher(algorithm, cryptoPass)
  let crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

function decrypt (text) {
  let decipher = crypto.createDecipher(algorithm, cryptoPass)
  let dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

module.exports = handlePostRegistry
