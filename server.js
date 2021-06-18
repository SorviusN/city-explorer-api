// ---- initial config ----
const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

// ---- middleware (used to let client and server talk to eachother) ---
const cors = require('cors');
app.use(cors()); // telling our express app that we are using cors (lets other servers talk to other servers)

const root = require('./routeHandlers/root');
const getWeather = require('./routeHandlers/getWeather');
const getMovies = require('./routeHandlers/getMovies');

app.get('/', root); //referencing our root file to perform all of the code actions.

app.get('/weather', getWeather);

app.get('/movie', getMovies);


//any server that isn't specified above defaults to below.
app.get('/*',(res) => {
  res.send('404 Error - Server not found.');
});

// config part 2
app.listen(PORT, () => {
  console.log(console.log(`listening on port ${PORT}`));
});







