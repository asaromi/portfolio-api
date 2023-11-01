const {Router} = require('express')
const indexRouter = new Router()

indexRouter.use('/v1', require('./v1'))

module.exports = indexRouter
