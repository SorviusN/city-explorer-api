// ---- initial config ----
const express = require('express');
const app = express();

require('dotenv').config();

//referencing our PORT from .env file
const PORT = process.env.PORT;

// ---- middleware (used to let client and server talk to eachother) ---
// telling our express app that we are using cors (lets other servers talk to other servers)
const cors = require('cors');
app.use(cors()); 
//File routing to each routeHandler
const root = require('./routeHandlers/root');
const getWeather = require('./routeHandlers/getWeather');
const getMovies = require('./routeHandlers/getMovies');

//referencing our root file to perform all of the code actions.
app.get('/', root);

//Getting the weather data.
app.get('/weather', getWeather);

//getting the movie data. References 
app.get('/movie', getMovies);

//any server that isn't specified above defaults to below.
app.get('/*',(res) => {
  res.send('404 Error - Server not found.');
});

// config part 2
app.listen(PORT, () => {
  console.log(console.log(`listening on port ${PORT}`));
});







