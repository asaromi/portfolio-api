const { Router } = require('express')
const router = new Router()
const products = require('./product')

router.use('/products', products)

module.exports = router
