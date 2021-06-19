'use strict';

const axios = require('axios');

let cache = require('../cache.js');

const weatherKey = process.env.WEATHER_API_KEY;

module.exports = getWeather;

function getWeather(lat, lon){
  const key = 'weather-' + lat + lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weatherKey}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit!');
  }
  else {
    console.log('Cache miss!');
    cache[key] = {};
    cache[key.timestamp] = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseWeather(response.body));
  }
  return cache[key].data;
}

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
