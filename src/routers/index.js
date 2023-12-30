const {Router} = require('express')
const router = new Router()

router.use('/email', require('./email'))
router.use('/stripe', require('./stripe'))
// router.use('/weather', require('./weather'))
router.use('/v1', require('./v1'))

module.exports = router
