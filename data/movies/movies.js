const Movies = require("../../models/Movies");
const { models } = require("mongoose");
const { getGenres, getLanguages } = require("../home/home");

const getAllMovies = async (req, res) => {
  let movies = await Movies.find({});
  if (movies) {
    const genreMovies = await getGenres();
    const langFilter = await getLanguages();
    res.status(200).render("pages/movie/list", {
      movies,
      genreMovies,
      langFilter,
      clearFilters: true,
    });
  } else {
    req.flash("toastMessage", `email or password incorrect`);
    res.redirect("back");
  }
};
const getFilteredMovies = async (req, res) => {
  let filters = req.body.filters;
  if (!filters) {
    req.flash("toastMessage", "Invalid request");
    res.redirect("back");
  } else {
    filters = JSON.parse(JSON.parse(filters));
    console.log(
      filters,
      typeof filters,
      !filters.language,
      !filters.genre,
      "this is it"
    );
    if (!("language" in filters) || !("genre" in filters)) {
      req.flash("toastMessage", "Invalid request");
      res.redirect("back");
    } else {
      const languageFilter = filters.language;
      const genreFilter = filters.genre;
      console.log(languageFilter, genreFilter, "this is it");
      let movies = [];
      if (languageFilter && languageFilter.length > 0) {
        movies = await Movies.find({
          language: { $in: languageFilter },
        });
      } else {
        movies = await Movies.find({});
      }

      console.log(movies, "this is it");

      if (movies) {
        let finalMovie = [];
        if (genreFilter && genreFilter.length > 0) {
          movies.forEach((movie) => {
            if (movie.genre) {
              let common = genreFilter.filter((value) =>
                movie.genre.includes(value)
              );
              if (common && common.length > 0) {
                finalMovie.push(movie);
              }
            }
          });
        } else {
          finalMovie = movies;
        }

        const genreMovies = await getGenres();
        const langFilter = await getLanguages();
        res.status(200).render("pages/movie/list", {
          movies: finalMovie,
          genreMovies,
          langFilter,
        });
      } else {
        req.flash("toastMessage", `Invalid request`);
        res.redirect("back");
      }
    }
  }
};

module.exports = {
  getAllMovies,
  getFilteredMovies,
};
