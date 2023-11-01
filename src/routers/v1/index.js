const {Router} = require('express')
const indexRouter = new Router()

const email = require('./email')
const stripe = require('./stripe')

indexRouter.get('/', (req, res) => {
  return res.status(200).json({ status: 'OK', success: true, message: 'Welcome to global api service' })
})

indexRouter.use('/email', email)
indexRouter.use('/stripe', stripe)

module.exports = indexRouter
