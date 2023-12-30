const {Router} = require('express')
const router = new Router()

const email = require('../email')
const stripe = require('../stripe')
const products = require('./product')

router.get('/', (req, res) => {
  return res.status(200).json({ status: 'OK', success: true, message: 'Welcome to global api service' })
})

router.use('/email', email)
router.use('/stripe', stripe)
router.use('/products', products)

module.exports = router
