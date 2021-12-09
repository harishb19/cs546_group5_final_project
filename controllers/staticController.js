const { registration, checkUserByEmailPassword } = require("../data/auth/auth");
const { getAllMovies } = require("../data/movies/movies");
const { getLandingPage } = require("../data/home/home");

module.exports.login = function (req, res, next) {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("pages/auth/auth", { isLogin: true });
  }
};
module.exports.loginAuth = function (req, res, next) {
  console.log("loginCheck entry 1");
  if (req.session.user) {
    res.redirect("/");
  }
  checkUserByEmailPassword(req, res);
};

module.exports.register = function (req, res, next) {
  if (req.session.newUser === true) {
    res.render("pages/auth/auth", { isLogin: false });
  } else res.redirect("back");
};
module.exports.registerSubmit = (req, res, next) => {
  registration(req, res);
};
module.exports.checkAuth = function (req, res, next) {
  if (req.session.loggedIn === true) {
    next();
  } else {
    res.redirect("/", {
      toastMessage: "You must Sign In to Continue !",
      toastStatus: "success",
    });
  }
};

module.exports.home = function (req, res, next) {
  getLandingPage(req, res);
};
module.exports.moviesList = function (req, res, next) {
  getAllMovies(req, res);
};
module.exports.movies = function (req, res, next) {
  res.render("pages/movie/details");
};
module.exports.theaterList = function (req, res, next) {
  res.render("pages/theater/list");
};
module.exports.seatSelection = function (req, res, next) {
  res.render("pages/theater/seat");
};
module.exports.checkout = function (req, res, next) {
  res.render("pages/checkout/orderSummary");
};
module.exports.ticket = function (req, res, next) {
  if (req.session.user) {
    res.render("pages/checkout/ticket");
  } else {
    res.redirect("login");
  }
};

module.exports.logout = function (req, res, next) {
  req.logout();
  req.user = null;
  req.session.user = null;
  req.session.loggedIn = false;
  req.flash("toastStatus", "success");
  req.flash("toastMessage", `Thanks for visiting. See you soon`);

  res.redirect("/");
};
