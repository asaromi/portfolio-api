const {Router} = require('express')
const {sendEmail} = require('../../controllers/v1/email')
const emailRouter = new Router()

emailRouter.post(
  '/send',
  async (req, res, next) => {
    console.log('req.body', req.body)
    next()
  },
  sendEmail
)

module.exports = emailRouter
