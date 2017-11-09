const ApiRouter = require('express').Router()
const Controllers = require('./controllers')
const Auth = require('./auth')

ApiRouter.route('/items')
  .get(Controllers.getAllItems)
ApiRouter.route('/login')
  .post(Controllers.logIn)
ApiRouter.route('/signup')
  .post(Controllers.signUp)
ApiRouter.route('/me')
  .get(Auth.verifyToken, Controllers.getUser)

module.exports = ApiRouter
