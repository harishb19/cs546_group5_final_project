const Movies = require("../../models/Movies");
const { models } = require("mongoose");

const getAllMovies = (req, res) => {
  Movies.find({}, (error, movies) => {
    if (error) {
      req.flash("toastMessage", `email or password incorrect`);
      res.redirect("back");
    } else if (movies) {
      req.flash("toastMessage", `${movies.length}`);

      res.status(200).render("pages/movie/list", { movies });
    } else {
      req.flash("toastMessage", `email or password incorrect`);
      res.redirect("back");
    }
  });
};

module.exports = {
  getAllMovies,
};
