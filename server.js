console.log('proof of life');

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors()); // telling our express app that we are using cors (lets other servers talk to other servers)

require('dotenv').config();

const PORT = process.env.PORT;


// --------------------------------------
const weatherData = require('./data/weather.json');

app.get('/', (request, response) => {
  response.send('proof of life');
  response.send.weatherData;
});

app.get('/weather', (request, response) => {
  let lat = request.query.lat;
  let lon = request.query.lon;
  let name = request.query.searchQuery;

  let placeMatch = (weatherData) => name.includes(weatherData.city_name);

  console.log(weatherData.find(placeMatch));
  response.send(weatherData.find(placeMatch));
});

app.listen(PORT, () => {
  console.log(console.log(`listening on port ${PORT}`));
});







