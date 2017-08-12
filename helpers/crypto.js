const crypto = require('crypto')
const createId = () => '_' + Math.random().toString(36).substr(2, 9)

 // createID is a password/keyword unique for every time the server is started shuteddown or restarted
 // in consequence the old user(email:password) .txt will no be able to be decrypted
const cryptoPass = 'hola'
const algorithm = 'aes-256-ctr'

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

module.exports = {encrypt, decrypt}
