const {Router} = require('express')
const router = new Router()

router.use('/email', require('./email'))
router.use('/stripe', require('./stripe'))

module.exports = router
