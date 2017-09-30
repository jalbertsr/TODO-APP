const crypto = require('crypto')
const createId = () => '_' + Math.random().toString(36).substr(2, 9)
const cryptoPass = 'secret' // createId
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
