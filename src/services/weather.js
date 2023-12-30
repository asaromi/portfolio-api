require("dotenv").config()
const fetch = require("node-fetch")

class WeatherService {
  constructor() {
    this.apiKey = process.env.WHEATHER_API_KEY
  }

  async getWeather(cityName) {
    const response = await fetch(`${this.host}?q=${cityName}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        "x-rapidapi-key": this.apiKey,
      },
    })

    if (!response.ok) throw new Error("Getting weather failed")

    return await response.json()
  }
}

module.exports = WeatherService
