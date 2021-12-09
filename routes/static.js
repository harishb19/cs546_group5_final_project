const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");
const passport = require("passport");
const Genres = require("../models/Genres");
const TopMovies = require("../models/TopMovies");

router.get("/", staticController.home);
router.get("/login", staticController.login);
router.post("/login", staticController.loginAuth);
router.get("/register", staticController.register);
router.post(
  "/register",
  staticController.registerSubmit,
  staticController.register
);
router.get("/movies", staticController.moviesList);
router.get("/movies/:id", staticController.movies);
router.get("/movies/:id/book", staticController.theaterList);
router.get("/movies/:id/book/seat", staticController.seatSelection);
router.get("/movies/:id/book/seat/pay", staticController.checkout);
router.post("/ticket", staticController.checkAuth, staticController.ticket);
router.post("/genre", function (req, res) {
  const { name, images } = req.body;
  let gen = new Genres();
  gen.name = name;
  gen.images = images;
  gen.save((err, doc) => {
    if (err) {
      console.log(err);
      req.flash("toastMessage", `some error try again`);
      res.json({ err: err });
    } else {
      req.flash("toastMessage", `done`);
      req.flash("toastStatus", `success`);
      res.json({ success: "success" });
    }
  });
});
router.post("/top", function (req, res) {
  const { movieId } = req.body;
  let tm = new TopMovies();
  tm.movieId = movieId;
  tm.save((err, doc) => {
    if (err) {
      console.log(err);
      req.flash("toastMessage", `some error try again`);
      res.json({ err: err });
    } else {
      req.flash("toastMessage", `done`);
      req.flash("toastStatus", `success`);
      res.json({ success: "success" });
    }
  });
});

router.get("/logout", staticController.logout);

// Google oAuth Sign In
router.get(
  "/oauth/signin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google oAuth Callback
router.get(
  "/oauth/signin/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/register",
  })
);

module.exports = router;
