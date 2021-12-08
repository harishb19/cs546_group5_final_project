const {registration, checkUserByEmailPassword} = require("../data/auth/auth");
const {seatSelectionHandler} = require("../data/seat/seat");
const {checkoutHandler} = require("../data/checkout/checkout");


module.exports.login = function (req, res, next) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.render('pages/auth/auth', {isLogin: true})
    }

}
module.exports.loginAuth = function (req, res, next) {
    console.log("loginCheck entry 1")
    if (req.session.user) {
        res.redirect('/');
    }
    checkUserByEmailPassword(req, res)

}

module.exports.register = function (req, res, next) {
    if (req.session.newUser === true) {
        res.render('pages/auth/auth', {isLogin: false});
    } else res.redirect('back');
}
module.exports.registerSubmit = (req, res, next) => {
    registration(req, res)
}
module.exports.checkAuth = function (req, res, next) {
    if (req.session.loggedIn === true) {
        next();
    } else {
        res.redirect('/', {toastMessage: 'You must Sign In to Continue !', toastStatus: 'success'});
    }
}

module.exports.home = function (req, res, next) {
    res.render('pages/home/landing')
}
module.exports.moviesList = function (req, res, next) {
    res.render('pages/movie/list');
}
module.exports.movies = function (req, res, next) {
    res.render('pages/movie/details');
}
module.exports.theaterList = function (req, res, next) {
    res.render('pages/theater/list');
}
module.exports.seatSelection = async function (req, res, next) {
    await seatSelectionHandler(req, res)

}

module.exports.checkout = function (req, res, next) {
    checkoutHandler(req, res)
}
module.exports.ticket = function (req, res, next) {
    if (req.session.user) {
        res.render('pages/checkout/ticket');
    } else {
        res.redirect("login")
    }
}


module.exports.logout = function (req, res, next) {
    req.logout();
    req.user = null;
    req.session.user = null;
    req.session.loggedIn = false;
    req.flash('toastStatus', 'success');
    req.flash('toastMessage', `Thanks for visiting. See you soon`);

    res.redirect('/');
};

module.exports.addMovieScreens = function (req, res, next) {
    const {movieId, screens} = req.body;

    const movieScreen = new MovieScreens({
        movieId: movieId, screens: screens
    })

    movieScreen.save(function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            req.session.newUser === false;
            console.log("new moviescreen added.");
        }
    })
    res.json({"check": "console log"});
}


module.exports.addTheatre = function (req, res, next) {
    var mongoose = require('mongoose');
    var id = new mongoose.Types.ObjectId().getTimestamp();
    console.log(id)
    const {theatreId, theatreName, location, screens} = req.body;

    const theatre = new Theatre({
        theatreId: theatreId, theatreName: theatreName, location: location, screens: screens
    })
    theatre.save(function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            req.session.newUser = false;
            console.log("new theatre added.");
        }
    })
    res.json({"check": "console log"});
}

module.exports.addMovie = function (req, res, next) {
    var mongoose = require('mongoose');
    var id = new mongoose.Types.ObjectId();
    console.log(req.body)
    const {
        movieId, movieName, genre, cast, description, images, releaseDate, language, runtimeInSecs, IMDBRating
    } = req.body;
    const movie = new Movie({
        movieId: movieId,
        movieName: movieName,
        genre: genre,
        cast: cast,
        description: description,
        images: images,
        releaseDate: releaseDate,
        language: language,
        runtimeInSecs: runtimeInSecs,
        IMDBRating: IMDBRating
    })
    movie.save(function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            req.session.newUser === false;
            console.log("new movie added.");
        }
    })
    res.json({"check": "console log"});
}
