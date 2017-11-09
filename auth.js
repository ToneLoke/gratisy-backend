const jwt = require('jsonwebtoken')
const SECRET = 'testCODE'

class Auth {
  static verifyToken (req, res, next) {
    // 1 - let's check everywhere for the user's token
    let token = req.body.token || req.param('token') || req.headers['x-access-token']
    if (token) {
      // 2 -  decode the token with the servers secret
      jwt.verify(token, SECRET, (err, decodedToken) => {
        if (err) {
          res.status(403).send({success: false, message: err.message})
        } else {
          req.decoded = decodedToken
          next()
        }
      })
    } else {
  		// 3 - If we can't find a token at all, we'll just send back an error message
      res.status(403).send({success: false, message: 'no token provided'})
    }
  }
  static createToken ({username, _id, picUrl}) {
    // "aaaaa.bbbbb.ccccc"
    return jwt.sign({ username, _id, picUrl}, SECRET, { expiresIn: '1h' })
  }
}

module.exports = Auth
