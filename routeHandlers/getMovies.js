const axios = require('axios');

require('dotenv').config();
const movieKey = process.env.MOVIE_API_KEY;

class Movie {
  constructor(data) {
    this.title = data.title;
    this.overview = data.overview;
    this.averageVotes = data.vote_average;
    this.totalVotes = data.vote_count;
    this.imageUrl = `https://image.tmdb.org/t/p/w300/${data.poster_path}`;
    this.popularity = data.popularity;
    this.releaseDate = data.release_date;
  }
}

let getWeather = async (req, res) => {
  let cityName = req.query.city;
  let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${cityName}&page=1&include_adult=false`);

  console.log(movieData.data);

  let movieDataArr = movieData.data.results;
  res.send(movieDataArr.map(data => new Movie(data)));
};

module.exports = getWeather;

