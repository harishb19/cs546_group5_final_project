const formidable = require('formidable');const User = require('../models/Users');const Theatre = require('../models/Theatre');const Movie = require('../models/Movies');const MovieScreens = require('../models/MovieScreens');const {get, isValidObjectId} = require("mongoose");const mongoose = require("mongoose");const {param} = require("express/lib/router");const {ObjectId} = require("mongodb");const {theaterList} = require("./staticController");const seatData = require('../data/seat');module.exports.login = function (req, res, next) {    if (req.session.user) {        res.redirect('/');    } else {        res.render('pages/auth/login')    }}module.exports.addMovieScreens = function (req, res, next) {    const {movieId, screens} = req.body;    const movieScreen = new MovieScreens( {        movieId: movieId,        screens: screens    })    movieScreen.save(function (err, doc){        if (err) {            console.log(err);        } else {            req.session.newUser === false;            console.log("new moviescreen added.");        }    })    res.json({"check": "console log"});}module.exports.addTheatre = function (req, res, next){    var mongoose = require('mongoose');    var id = new mongoose.Types.ObjectId().getTimestamp();    console.log(id)    const {theatreId, theatreName, location, screens} = req.body;    const theatre = new Theatre({        theatreId: theatreId,        theatreName: theatreName,        location: location,        screens: screens    })    theatre.save(function (err, doc){        if (err) {            console.log(err);        } else {            req.session.newUser === false;            console.log("new theatre added.");        }    })    res.json({"check": "console log"});}module.exports.addMovie = function (req, res, next){    var mongoose = require('mongoose');    var id = new mongoose.Types.ObjectId();    console.log(req.body)    const {movieId, movieName, genre, cast, description, images, releaseDate, language, runtimeInSecs, IMDBRating} = req.body;    const movie = new Movie({        movieId: movieId,        movieName: movieName,        genre: genre,        cast: cast,        description: description,        images: images,        releaseDate: releaseDate,        language: language,        runtimeInSecs: runtimeInSecs,        IMDBRating: IMDBRating    })    movie.save(function (err, doc){        if (err) {            console.log(err);        } else {            req.session.newUser === false;            console.log("new movie added.");        }    })    res.json({"check": "console log"});}module.exports.register = function (req, res, next) {    if (req.session.newUser == true) {        res.render('pages/auth/signup');    } else        res.redirect('back');}module.exports.registerSubmit = function (req, res, next) {    const form = new formidable.IncomingForm();    form.parse(req, function (err, fields, files) {        if (fields.name === "" || fields.email === "" || fields.gender === undefined || fields.dateOfBirth === "" || fields.contact === "") {            message = 'Please enter all the details';        } else {            console.log('----------------');            console.log(req.session.imageUrl);            const user = new User({                name: fields.name,                email: fields.email,                imageUrl: req.session.imageUrl,                gender: fields.gender,                dateOfBirth: fields.dateOfBirth,                bloodGroup: fields.bGroup,                contact: fields.contact,                role: 'patient'            });            user.save(function (err, doc) {                if (err) {                    console.log(err);                    req.flash('toastMessage', 'some error try again');                    res.redirect('back');                } else {                    req.session.newUser === false;                    console.log("new user added.");                    req.flash('toastMessage', 'You have registered successfully!');                    req.flash('toastStatus', 'success');                    res.redirect('/');                }            });        }    });}module.exports.checkAuth = function (req, res, next) {    if (req.session.loggedIn == true) {        next();    } else {        req.flash('toastMessage', 'You must Sign In to Continue !');        req.flash('toastStatus', 'success');        res.redirect('/');    }}module.exports.home = function (req, res, next) {    res.render('pages/home/landing')}module.exports.moviesList = function (req, res, next) {    res.render('pages/movie/list');}module.exports.movies = function (req, res, next) {    res.render('pages/movie/details');}module.exports.theaterList = function (req, res, next) {    console.log(req.params)    res.render('pages/theater/list', {id: req.params.id});}module.exports.seatSelection = async function (req, res, next) {    try {        if(!req.body) throw 'Error: Request body empty';        if(Object.keys(req.body).length < 4) throw 'Error: less data passed';        const {movieId, theatreId,screenId, showTimeId} = req.body;        /*------------ Error Handling Start ------------*/        if (! ObjectId.isValid(movieId)) throw 'Error: movieId is not valid Object ID';        if (! ObjectId.isValid(theatreId)) throw 'Error: theatreId is not valid Object ID';        if (! ObjectId.isValid(screenId)) throw 'Error: screenId is not valid Object ID';        if (! new Date(showTimeId)) throw 'Error: showTimeId is not valid TimeStamp'; //Check Once again        /*------------ Error Handling End ------------*/        const screenInfoObj = await seatData.seatSelection(movieId, theatreId, screenId, showTimeId);        const screenInfo = {            layout: screenInfoObj.layout,            availability: screenInfoObj.availability        }        const theatreInfo = {            theatreId: screenInfoObj.theatreId,            theatreName: screenInfoObj.theatreName        }        const movieDateTime = screenInfoObj.showtime.toString();        const movieInfo = {            movieId: screenInfoObj.movieId,            movieName: screenInfoObj.movieName,            movieLanguage: screenInfoObj.language,            movieDate: movieDateTime,            showTimeId: screenInfoObj.showtime,            price: screenInfoObj.price        }        res.render('pages/theater/seat', {'title': "Seat Selection", 'seatInfo': JSON.stringify(screenInfo), 'movieInfo': movieInfo, 'theatreInfo': theatreInfo});    }catch (e) {        console.log(e);        res.render('pages/home/landing')    }}module.exports.checkout = function (req, res, next) {    try {        /*------------ Error Handling Start ------------*/        if(!req.body) throw 'Error: Request body empty';        if(!req.body['Purchase Summary']) throw 'Error: Request body empty'        const {movieId, movieName, theatreId, theatreName, dateTime, noOfSeats, seats, showTimeId, price} = JSON.parse(req.body['Purchase Summary']);        if (!movieId || !movieName || !theatreId || !theatreName || !dateTime || !noOfSeats || !seats || !showTimeId || !price) throw 'Error: Missing data in Purchase Summary';        if (!isValidObjectId(movieId)) throw 'Error: movieId is not a valid ObjectId';        if (!isValidObjectId(theatreId)) throw 'Error: theatreId is not a valid ObjectId';        if (typeof movieName !== 'string') throw 'Error: movieName not of type string';        if (typeof theatreName !== 'string') throw 'Error: theatreName not of type of string';        if (! new Date(dateTime)) throw 'Error: dateTime cannot be converted to type Date';        if (typeof noOfSeats !== 'number') throw 'Error: noOfSeats not of type of number';        if (!Array.isArray(seats)) throw 'Error: seats is not an array';        if (! new Date(showTimeId)) throw 'Error: showTimeId cannot be converted to type Date';        if (!parseFloat(price)) throw 'Error: price cannot be parsed to Float';        /*------------ Error Handling End ------------*/        const purchaseSummary = {            movieId: movieId,            movieName: movieName,            theatreId: theatreId,            theatreName: theatreName,            dateTime: dateTime,            noOfSeats: noOfSeats,            seats: seats,            showTimeId: showTimeId,            price: price,            totalAmount: parseFloat(price) * noOfSeats        }        const pSumString = JSON.stringify(purchaseSummary);        res.render('pages/checkout/orderSummary', {'purchaseSummary' : purchaseSummary, pSumString: pSumString});    }    catch (e){        console.log(e);        res.render('pages/home/landing')    }}module.exports.ticket = function (req, res, next) {    if (req.session.user) {        res.render('pages/checkout/ticket');    } else {        res.redirect("login")    }}module.exports.logout = function (req, res, next) {    req.user = null;    req.session.user = null;    req.session.loggedIn = false;    req.flash('toastMessage', 'Thanks for visiting. See you soon');    req.flash('toastStatus', 'success');    res.redirect('/');};