'use strict';

require ('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

//File routing to each routeHandler
const root = require('./routeHandlers/root');
const weather = require('./routeHandlers/weather.js');
const movies = require('./routeHandlers/movies.js');

//referencing our root file to perform all of the code actions.
app.get('/', root);

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const lat = request.query.lat;
  const lon = request.query.lon;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry, Something isn\'t quite right');
    });
}

function movieHandler(request, response) {
  const city = request.query.city;
  movies(city)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry, Something isn\'t quite right');
    });
}
//Getting the movie data. References
app.get('/movie', movieHandler);

//any server that isn't specified above defaults to below.
app.get('/*',(res) => {
  res.send('404 Error - Server not found.');
});

// config part 2
app.listen(process.env.PORT, () => {console.log(`Server up on ${process.env.PORT}`);});


