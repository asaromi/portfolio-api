const express = require('express')
const {checkoutSession, listenAmazonWebhook} = require('../controllers/stripe')
const router = new express.Router()

router.post('/amazon-webhook', listenAmazonWebhook)
router.post('/checkout-session',checkoutSession)

module.exports = router
