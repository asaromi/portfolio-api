const { Router } = require('express')
const {getWeatherCity} = require('../controllers/weather')
const router = new Router()

router.get('/:city', getWeatherCity)

module.exports = router
