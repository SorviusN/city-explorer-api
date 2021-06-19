const axios = require('axios');

const weatherKey = process.env.WEATHER_API_KEY;

class Forecast {
  constructor(data) {
    this.date = data.valid_date;
    this.description =`low of ${data.low_temp}, high of ${data.high_temp} with ${data.weather.description}`;
    this.key = data.valid_date;
  }
}


let getWeather = async (req, res) => {
  let lon = req.query.lon;
  let lat = req.query.lat;

  let weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weatherKey}`);

  res.send(weatherData.data.data.map(forecastDay => new Forecast(forecastDay)));
};

module.exports = getWeather;
