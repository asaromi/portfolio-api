const {Router} = require('express')
const indexRouter = new Router()

const email = require('./email')

indexRouter.use('/v1/email', email)

module.exports = indexRouter
