const {Router} = require('express')
const {sendEmail} = require('../controllers/v1/email')
const emailRouter = new Router()

emailRouter.post(
  '/send',
  sendEmail
)

module.exports = emailRouter
