// setting eslint to strict mode
'use strict';

//letting the file send requests to API
const axios = require('axios');

//setting our directory for the cache folder, where all of the data will be stored.
let cache = require('../cache.js');

//the key for weather API.
const weatherKey = process.env.WEATHER_API_KEY;

//exporting the getWeather folder for use in other areas.
module.exports = getWeather;

//starts by setting a key for the cache as well as creating an axios request
function getWeather(lat, lon){
  const key = 'weather-' + request.query.lat + request.query.lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weatherKey}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit!', cache[key]);
  }
  else {
    console.log('Cache miss! Creating a cache for the item.');
    cache[key] = {}; //initializing cache at whatever the key is.
    cache[key].timestamp = Date.now(); //setting the timestamp value of the object in cache
    cache[key].data = axios.get(url)// setting the data at the cache object.
      .then(response => parseWeather(response.body));
  }
  console.log(cache[key].data);
  return cache[key].data;
}

//this function is called if the cache is not present when searched (in the .then part of the above function. It returns an array of Weather objects with the appropriate data.);
function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.date = day.valid_date;
    this.description =`low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
    this.key = day.valid_date;
  }
}

//constructing a class for the Weather object that we will use.
