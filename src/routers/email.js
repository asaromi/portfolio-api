const {Router} = require('express')
const {sendEmail} = require('../controllers/email')
const router = new Router()

router.post('/send', sendEmail)

module.exports = router
