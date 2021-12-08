const {registration, checkUserByEmailPassword} = require("../data/auth/auth");
const movies = require("../models/Movies");
let mongoose = require('mongoose');


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
    } else
        res.redirect('back');
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
module.exports.movies = function (req,res, next) {
    res.render('pages/movie/details');
}

module.exports.movieDetail_Info = function (req, res) {
    const id = req.body.id;
    const movie_Id = mongoose.Types.ObjectId(id);
    movies.findOne({movieId: movie_Id}, (err, doc) => {
        if(err) return 'error!';
        if (!doc) return 'error';
        return res.json({success: true, doc});
    });
}

module.exports.movieDetail_Cast = function (req, res) {
    const id = req.body.id;
    const movie_Id = mongoose.Types.ObjectId(id);
    movies.findOne({movieId: movie_Id}, (err, doc) => {
        if(err) return 'error!';
        const castInfo = doc.cast;
        return res.json({success: true, castInfo});
    });
}

module.exports.movieDetail_Reviews = function (req, res) {
    const id = req.body.id;
    // Temporary Data Only for test
    //const movieDetail;
    const reviewInfo = [
        {
            userImgSrc: '',
            userName: 'User01',
            userReview: 'It was not bad. The movie is a little long but I liked it. The acting was good, the script wasn\'t bad either.'
        },
        {
            userImgSrc: '',
            userName: 'User02',
            userReview: 'It was not bad. The movie is a little long but I liked it. The acting was good, the script wasn\'t bad either.'
        },
        {
            userImgSrc: '',
            userName: 'User03',
            userReview: 'It was not bad. The movie is a little long but I liked it. The acting was good, the script wasn\'t bad either.'
        }
    ];
    return res.json({success: true, reviewInfo});
}
module.exports.theaterList = function (req, res, next) {
    res.render('pages/theater/list');
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
    req.flash('toastStatus', 'success');
    req.flash('toastMessage', `Thanks for visiting. See you soon`);

    res.redirect('/');
};
