const fs = require('fs')
const strftime = require('strftime')
const path = require('path')
const crypto = require(path.join(process.cwd(), './helpers/crypto'))
const decrypt = crypto.decrypt
const encrypt = crypto.encrypt

function handlePostRegistry (req, res) {
  const { email, password } = req.body
  const dataToWrite = `${email}:${password}`
  const encryptedData = '\r\n' + encrypt(dataToWrite)
  let existentUser = false

  fs.readFile('./data-db/users_txt.txt', 'utf-8', function (err, data) {
    if (err) throw err
    const usersArrEncrypted = data.split('\r\n')
    const usersArrDecrypted = usersArrEncrypted.map((aAuthLine) => decrypt(aAuthLine))
    usersArrDecrypted.forEach((user) => {
      let [emailDB] = user.split(':')
      if (emailDB === email) existentUser = true
    })
    if (existentUser) {
      console.log('Email already in use')
      res.redirect('/registry/') // flash message
    } else {
      fs.appendFile('./data-db/users_txt.txt', encryptedData, function (err) {
        if (err) throw err
        console.log('------ New registry --------------')
        console.log('email: ' + email)
        console.log('password: ' + password)
        console.log('registered at: ' + strftime('%F:%T', new Date()))
        console.log('encrypted as: ' + encryptedData)
        console.log('----------------------------------')
        createCleanUserTask(email)
        res.redirect('/')
      })
    }
  })
}

function createCleanUserTask (userID) {
  const newUserTask = {tasks: [], completed: []}
  fs.writeFile(`./data-db/users_tasks/${userID}.json`, JSON.stringify(newUserTask), 'utf-8')
}

module.exports = handlePostRegistry
