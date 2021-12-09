const express = require('express');
const router = express.Router();
const staticController = require('../controllers/staticController');
const passport = require('passport');

router.get('/', staticController.home);
router.get('/login', staticController.login);
router.post('/login', staticController.loginAuth);
router.get('/register', staticController.register);
router.post('/register', staticController.registerSubmit, staticController.register);
router.get('/movies', staticController.moviesList);
router.get('/movies/:id', staticController.movies);
router.get('/movies/:id/book', staticController.theaterList);
router.get('/movies/:id/book/seat', staticController.seatSelection);
router.get('/movies/:id/book/seat/pay', staticController.checkout);
router.post('/ticket', staticController.checkAuth,staticController.ticket);


router.get('/logout',staticController.logout);


// Google oAuth Sign In
router.get('/oauth/signin', passport.authenticate('google', {scope: ['profile', 'email']}));


// Google oAuth Callback
router.get('/oauth/signin/callback',
    passport.authenticate('google', {
        successRedirect : '/',
        failureRedirect : '/register'
    })
);


module.exports = router;

