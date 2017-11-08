const ApiRouter = require('express').Router()
const Controllers = require('./controllers')

ApiRouter.route('/items')
  .get(Controllers.getAllItems)
ApiRouter.route('/login')
  .post(Controllers.logIn)
ApiRouter.route('/signup')
  .post(Controllers.signUp)

module.exports = ApiRouter
