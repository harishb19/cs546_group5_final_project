const Movies = require("../../models/Movies");
const { models } = require("mongoose");
const Genres = require("../../models/Genres");
const TopMovies = require("../../models/TopMovies");

const getLandingPage = async (req, res) => {
  const genreMovies = await getGenres();
  const upcomingMovies = await getUpcomingMovies();
  const topMovies = await getTopMovies();
  res.render("pages/home/landing", { upcomingMovies, topMovies, genreMovies });
};

const getUpcomingMovies = async () => {
  const movies = await Movies.find({});
  if (!movies) {
    return null;
  } else if (movies) {
    const today = new Date();
    upcomingMovies = [];
    movies.map(function (e) {
      const eDate = new Date(e.releaseDate);
      if (eDate > today) upcomingMovies.push(e);
    });
    return upcomingMovies;
  } else {
    return null;
  }
};
const getTopMovies = async () => {
  const movies = await TopMovies.find({});
  const movieIDS = [];
  if (movies) {
    movies.map(function ({ movieId }) {
      movieIDS.push(movieId);
    });
  }
  if (movieIDS) {
    const topMovies = await Movies.find({ movieId: { $in: movieIDS } });
    return topMovies;
  } else {
    return null;
  }
};
const getGenres = async () => {
  const genres = await Genres.find({});
  return genres;
};

module.exports = {
  getLandingPage,
};
