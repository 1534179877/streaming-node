const crypto = require('crypto')
const {SECRET_KEY} = require('./config')

//hmac加密
//crypto.createHmac( algorithm, key, options )
//key use to create the cryptographic hmac hash
function hmac (str) {
  return crypto.createHmac('md5', SECRET_KEY).update(str).digest('hex')
}

module.exports = hmac
