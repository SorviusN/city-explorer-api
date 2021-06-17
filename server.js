const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors()); // telling our express app that we are using cors (lets other servers talk to other servers)

require('dotenv').config();

const PORT = process.env.PORT;
const axios = require('axios'); //using axios to be able to send/receive requests to weather/movie API.

// --------------------------------------
const weatherKey = process.env.WEATHER_API_KEY;
const movieKey = process.env.MOVIE_API_KEY;

app.get('/', (req, res) => {
  res.send('proof of life');
  res.send.weatherData;
});

app.get('/weather', async (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;

  let weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weatherKey}`);

  res.send(weatherData.data.data);
});

app.get('/movie', async (req, res) => {
  let cityName = req.query.city;
  let encodedCityName = encodeURI(cityName);
  let movieData = axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${encodedCityName}&includeadult=false`);

  console.log(movieData);
  res.send(movieData);
});

app.get('/*',(req, res) => {
  res.send('404 Error - Server not found.');
});

app.listen(PORT, () => {
  console.log(console.log(`listening on port ${PORT}`));
});







