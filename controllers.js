const db = require('./models')
const Auth = require('./auth')

class Controllers {
  static getAllItems (req, res) {
    db.items.find({}, (err, items) => {
      if (err) {
        res.json(err)
      } else {
        res.json(items)
      }
    })
  }
  static logIn (req, res) {
    let username = req.body.username.toLowerCase()
    let password = req.body.password

    db.users.findOne({username: username})
    .exec((err, user) => {
      if (err) {
        res.json(err)
      } else if (user) {
        let dbResponse = user.verifyPW(password)
        if (dbResponse.valid) {
          res.json({...dbResponse, token: Auth.createToken(user)})
        } else {
          res.json(dbResponse)
        }
      } else {
        res.json({message: 'no user found'})
      }
    })
  }
  static signUp (req, res) {
    let newUser = new db.users(req.body)
    newUser.save((err, user) => {
      if (err) {
        res.json(err)
      } else {
        res.json(user)
      }
    })
  }
  static getUser (req, res) {
    let { username, id} = req.decoded
    db.users.findOne({username: username})
    .exec((err, user) => {
      if (err) {
        res.json(err)
      } else {
        res.json(user)
      }
    })
  }
}

module.exports = Controllers
