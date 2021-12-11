const {registration, checkUserByEmailPassword} = require("../data/auth/auth");
const {getAllMovies, getFilteredMovies} = require("../data/movies/movies");
const {getLandingPage} = require("../data/home/home");

const movies = require("../models/Movies");
const movieScreens = require("../models/MovieScreens");
const theater = require("../models/Theatre");
let mongoose = require('mongoose');

module.exports.setUser = (req, res, next) => {
    if (req.session.loggedIn === true) {
        console.log(req.session.user, "plxxxxxx")
        res.locals.userName = req.session.user.firstName
        res.locals.userImg = req.session.user.imageUrl
    }
    // console.log(res)
    next()
}
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
    getLandingPage(req, res);
};
module.exports.moviesList = async function (req, res, next) {
    await getAllMovies(req, res);
};
module.exports.moviesListWithFilters = async function (req, res, next) {
    await getFilteredMovies(req, res);
};
module.exports.movies = function (req, res, next) {
    res.render('pages/movie/details', {id: req.params.id});
}

module.exports.movieDetail_Info = function (req, res) {
    const id = req.body.id;
    let movie_Id;
    try {
        movie_Id = mongoose.Types.ObjectId(id);
    } catch (error) {
        return res.json({success: false});
    }
    movies.findOne({movieId: movie_Id}, (err, doc) => {
        if (err) return res.json({success: false});
        if (!doc) return res.json({success: false});
        return res.json({success: true, doc});
    });
}

module.exports.movieDetail_Cast = function (req, res) {
    const id = req.body.id;
    let movie_Id;
    try {
        movie_Id = mongoose.Types.ObjectId(id);
    } catch (error) {
        return res.json({success: false});
    }
    movies.findOne({movieId: movie_Id}, (err, doc) => {
        if (err) return res.json({success: false});
        if (!doc) return res.json({success: false});
        const castInfo = doc.cast;
        return res.json({success: true, castInfo});
    });
}

module.exports.movieDetail_Reviews = function (req, res) {
    const id = req.body.id;
    // Temporary Data Only for test
    const reviewInfo = [{
        userImgSrc: '',
        userName: 'User01',
        userReview: 'It was not bad. The movie is a little long but I liked it. The acting was good, the script wasn\'t bad either.'
    }, {
        userImgSrc: '',
        userName: 'User02',
        userReview: 'It was not bad. The movie is a little long but I liked it. The acting was good, the script wasn\'t bad either.'
    }, {
        userImgSrc: '',
        userName: 'User03',
        userReview: 'It was not bad. The movie is a little long but I liked it. The acting was good, the script wasn\'t bad either.'
    }];
    return res.json({success: true, reviewInfo});
}
module.exports.theaterList = function (req, res, next) {
    res.render('pages/theater/list', {id: req.params.id});
}

module.exports.screenInfo = function (req, res) {
    let movie_Id;
    try {
        movie_Id = mongoose.Types.ObjectId(req.body.id);
    } catch (error) {
        return res.json({success: false});
    }
    const selectDate = new Date(req.body.selectDate + " 00:00:00 GMT");
    movieScreens.findOne({movieId: movie_Id}, (err, doc) => {
        if (err) return res.json({success: false});
        if (!doc) return res.json({success: false});
        let screenInfo = [];
        let screens = doc.screens;
        for (let i = 0; i < screens.length; ++i) {
            let singleScreen = {
                screenId: "", showTimes: []
            };
            let screen = screens[i];
            for (let j = 0; j < screen.showTime.length; ++j) {
                let showTime = screen.showTime[j];
                let date = showTime.date;
                let showTimeTemp = {
                    showTimeId: "", time: ""
                }
                if ((date - selectDate) == 0) {
                    singleScreen.screenId = screens[i].screenId;
                    showTimeTemp.showTimeId = showTime.showTimeId;
                    showTimeTemp.time = showTime.time;
                    singleScreen.showTimes.push(showTimeTemp);
                }
            }
            if (singleScreen.showTimes.length != 0) screenInfo.push(singleScreen);
        }
        if (screenInfo.length == 0) return res.json({success: false});
        return res.json({success: true, screenInfo});
    });
}

module.exports.theaterInfo = function (req, res) {
    let screenId;
    try {
        screenId = mongoose.Types.ObjectId(req.body.screenId);
    } catch (error) {
        return res.json({success: false});
    }
    theater.findOne({screenId: screenId}, (err, doc) => {
        if (err) return res.json({success: false});
        if (!doc) return res.json({success: false});
        return res.json({success: true, doc});
    });
}

module.exports.seatSelection = function (req, res, next) {
    res.render('pages/theater/seat');
}
module.exports.checkout = function (req, res, next) {
    res.render('pages/checkout/orderSummary');
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
    req.flash("toastStatus", "success");
    req.flash("toastMessage", `Thanks for visiting. See you soon`);

    res.redirect("/");

};