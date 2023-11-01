const {Router} = require('express')
const {checkoutSession, listenAmazonWebhook} = require('../../controllers/v1/stripe')
const stripeRouter = new Router()

stripeRouter.post(
  '/amazon-webhook',
  listenAmazonWebhook
)

stripeRouter.post(
  '/checkout-session',
  async (req, res, next) => {
    console.log('req.body', req.body)
    next()
  },
  checkoutSession
)

module.exports = stripeRouter
