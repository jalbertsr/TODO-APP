const fs = require('fs')
const strftime = require('strftime')
const crypto = require('crypto')

function handlePostRegistry (req, res) {
  const { email, password } = req.body
  const dataToWrite = email + ':' + password
  const encryptedData = '\r\n' + encrypt(dataToWrite)
  let existentUser = false

  fs.readFile('./data-db/users_txt.txt', 'utf-8', function (err, data) {
    if (err) throw err
    const usersArrEncrypted = data.split('\r\n')
    const usersArrDecrypted = usersArrEncrypted.map((aAuthLine) => decrypt(aAuthLine))
    usersArrDecrypted.forEach((user) => {
      let [emailDB] = user.split(':')
      if (emailDB === email) {
        existentUser = true
      }
    })
    if (existentUser) {
      console.log('Email already in use')
      res.redirect('/regist/') //flash message
    } else {
      fs.appendFile('./data-db/users_txt.txt', encryptedData, function (err) {
        if (err) throw err
        console.log('------ New registry --------------')
        console.log('email: ' + email)
        console.log('password: ' + password)
        console.log('registered at: ' + strftime('%F:%T', new Date()))
        console.log('encrypted as: ' + encryptedData)
        console.log('----------------------------------')
        createUserTask(email)
        res.redirect('/')
      })
    }
  })
}

function createUserTask (userID) {
  const newUserTask = {tasks: [], completed: []}
  fs.writeFile(`./data-db/users_tasks/${userID}.json`, JSON.stringify(newUserTask), 'utf-8')
}

function encrypt (text) {
  let cipher = crypto.createCipher(global.algorithm, global.cryptoPass)
  let crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

function decrypt (text) {
  let decipher = crypto.createDecipher(global.algorithm, global.cryptoPass)
  let dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

module.exports = handlePostRegistry
