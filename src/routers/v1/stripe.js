const express = require('express')
const {checkoutSession, listenAmazonWebhook} = require('../../controllers/v1/stripe')
const stripeRouter = new express.Router()

stripeRouter.post(
  '/amazon-webhook',
  express.raw({type: 'application/json'}),
  listenAmazonWebhook
)

stripeRouter.post(
  '/checkout-session',
  checkoutSession
)

module.exports = stripeRouter
