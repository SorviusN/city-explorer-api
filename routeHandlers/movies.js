const axios = require('axios');

class Movie {
  constructor(data) {
    this.title = data.title;
    this.overview = data.overview;
    this.averageVotes = data.vote_average;
    this.totalVotes = data.vote_count;
    this.imageUrl = `https://image.tmdb.org/t/p/w300/${data.poster_path}`;
    this.popularity = data.popularity;
    this.releaseDate = data.release_date;
    this.key = data.title;
  }
}

let cache = require('../cache.js');

//the key for weather API.
const movieKey = process.env.MOVIE_API_KEY;

//starts by setting a key for the cache as well as creating an axios request
let getMovies = async(city) => {
  const key = 'movie-' + city;
  const url = (`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${city}&page=1&include_adult=false`);

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit!', cache[key]);
  }
  else {
    console.log('Cache miss! Creating a cache for the item...');
    cache[key] = {}; //initializing cache at whatever the key is.
    cache[key].timestamp = Date.now(); //setting the timestamp value of the object in cache
    cache[key].data = await axios.get(url)// setting the data at the cache object
      .then (response => parseMovies(response.data));
  }
  return cache[key].data;
};

//this function is called if the cache is not present when searched (in the .then part of the above function. It returns an array of Weather objects with the appropriate data.);
function parseMovies(movieData) {
  try {
    console.log(movieData);
    const movieSummaries = movieData.results.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}
module.exports = getMovies;

