'use strict';

require ('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

//File routing to each routeHandler
const root = require('./routeHandlers/root');
const weather = require('./routeHandlers/weather.js');
const getMovies = require('./routeHandlers/getMovies.js');

//referencing our root file to perform all of the code actions.
app.get('/', root);

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const lat = request.query.lat;
  const lon = request.query.lon;
  try {
    console.log(weather(lat, lon));
    response.send(weather(lat, lon));
  }
  catch(err){
    console.error(err);
    response.status(200).send('Sorry, something went wrong!');
  }
}
//Getting the movie data. References
app.get('/movie', getMovies);

//any server that isn't specified above defaults to below.
app.get('/*',(res) => {
  res.send('404 Error - Server not found.');
});

// config part 2
app.listen(process.env.PORT, () => {console.log(`Server up on ${process.env.PORT}`);});


