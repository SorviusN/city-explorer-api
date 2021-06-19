'use strict';

require ('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());


//File routing to each routeHandler
const root = require('./routeHandlers/root');
const getWeather = require('./routeHandlers/getWeather');
const getMovies = require('./routeHandlers/getMovies');

//referencing our root file to perform all of the code actions.
app.get('/', root);

app.get('/weather', weatherHandler);

function weatherHandler(req, res) {
  const { lat, lon } = req.query;
  getWeather(lat, lon)
    .then(summaries => res.send(summaries))
    .catch((error) => {
      console.error(error);
      res.status(200).send('Sorry. Something went wrong!');
    });
}

//Getting the movie data. References
app.get('/movie', getMovies);

//any server that isn't specified above defaults to below.
app.get('/*',(res) => {
  res.send('404 Error - Server not found.');
});

// config part 2
app.listen(process.env.PORT, () => {console.log(`Server up on ${process.env.PORT}`);});


