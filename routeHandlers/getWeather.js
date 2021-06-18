const axios = require('axios');

require('dotenv').config();
const weatherKey = process.env.WEATHER_API_KEY;

let getWeather = async (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;

  let weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weatherKey}`);

  res.send(weatherData.data.data);
};

module.exports = getWeather;
