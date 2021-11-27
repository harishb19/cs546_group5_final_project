const formidable = require('formidable');const User = require('../models/Users');module.exports.login = function (req, res, next) {    if (req.session.user) {        res.redirect('/');    } else {        res.render('pages/auth/login')    }}module.exports.register = function (req, res, next) {    if (req.session.newUser == true) {        res.render('pages/auth/signup');    } else        res.redirect('back');}module.exports.registerSubmit = function (req, res, next) {    const form = new formidable.IncomingForm();    form.parse(req, function (err, fields, files) {        if (fields.name === "" || fields.email === "" || fields.gender === undefined || fields.dateOfBirth === "" || fields.contact === "") {            message = 'Please enter all the details';        } else {            console.log('----------------');            console.log(req.session.imageUrl);            const user = new User({                name: fields.name,                email: fields.email,                imageUrl: req.session.imageUrl,                gender: fields.gender,                dateOfBirth: fields.dateOfBirth,                bloodGroup: fields.bGroup,                contact: fields.contact,                role: 'patient'            });            user.save(function (err, doc) {                if (err) {                    console.log(err);                    req.flash('toastMessage', 'some error try again');                    res.redirect('back');                } else {                    req.session.newUser === false;                    console.log("new user added.");                    req.flash('toastMessage', 'You have registered successfully!');                    req.flash('toastStatus', 'success');                    res.redirect('/');                }            });        }    });}module.exports.checkAuth = function (req, res, next) {    if (req.session.loggedIn == true) {        next();    } else {        req.flash('toastMessage', 'You must Sign In to Continue !');        req.flash('toastStatus', 'success');        res.redirect('/');    }}module.exports.home = function (req, res, next) {    res.render('pages/home/landing')}module.exports.moviesList = function (req, res, next) {    res.render('pages/movie/list');}module.exports.movies = function (req, res, next) {    res.render('pages/movie/details');}module.exports.theaterList = function (req, res, next) {    res.render('pages/theater/list');}module.exports.seatSelection = function (req, res, next) {    res.render('pages/theater/seat');}module.exports.checkout = function (req, res, next) {    res.render('pages/checkout/orderSummary');}module.exports.ticket = function (req, res, next) {    if (req.session.user) {        res.render('pages/checkout/ticket');    } else {        res.redirect("login")    }}module.exports.logout = function (req, res, next) {    req.user = null;    req.session.user = null;    req.session.loggedIn = false;    req.flash('toastMessage', 'Thanks for visiting. See you soon');    req.flash('toastStatus', 'success');    res.redirect('/');};