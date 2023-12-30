const WeatherService = require('../services/weather')
const { successResponse, errorResponse } = require('../libs/response')

const weatherService = new WeatherService()

exports.getWeatherCity = async (req, res) => {
  try {
    const { city } = req.params

    const weather = await weatherService.getWeather(city)

    return successResponse(res, { data: weather })
  } catch (error) {
    return errorResponse(res, { error })
  }
}
