const formidable = require('formidable');
const User = require('../models/Users');

module.exports.login = function (req, res, next) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.render('pages/auth/login')
    }

}
module.exports.register = function (req, res, next) {
    if (req.session.newUser == true) {
        res.render('pages/auth/signup');
    } else
        res.redirect('back');
}
module.exports.registerSubmit = function (req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (fields.name === "" || fields.email === "" || fields.gender === undefined || fields.dateOfBirth === "" || fields.contact === "") {
            message = 'Please enter all the details';
        } else {
            console.log('----------------');
            console.log(req.session.imageUrl);
            const user = new User({
                name: fields.name,
                email: fields.email,
                imageUrl: req.session.imageUrl,
                gender: fields.gender,
                dateOfBirth: fields.dateOfBirth,
                bloodGroup: fields.bGroup,
                contact: fields.contact,
                role: 'patient'
            });
            user.save(function (err, doc) {
                if (err) {
                    console.log(err);
                    req.flash('toastMessage', 'some error try again');
                    res.redirect('back');
                } else {
                    req.session.newUser === false;
                    console.log("new user added.");
                    req.flash('toastMessage', 'You have registered successfully!');
                    req.flash('toastStatus', 'success');
                    res.redirect('/');
                }
            });
        }
    });
}
module.exports.checkAuth = function (req, res, next) {
    if (req.session.loggedIn == true) {
        next();
    } else {
        req.flash('toastMessage', 'You must Sign In to Continue !');
        req.flash('toastStatus', 'success');
        res.redirect('/');
    }
}

module.exports.home = function (req, res, next) {
    res.render('pages/home/landing')
}
module.exports.moviesList = function (req, res, next) {
    res.render('pages/movie/list');
}
module.exports.movieDetail = function (req, res, next) {
    const id = req.params.id
    res.render('pages/movie/details', {_id:id});
}

module.exports.movieDetail_Info = async (req, res) => {
    const id = req.body.id;
    // Temporary Data Only for test
    const movieDetail = {
        movieId: '123',
        movieName: 'No Time to Die',
        genre: ['Action/Adventure', 'Suspense/Thriller'],
        country: 'US',
        description: 'In No Time To Die, Bond has left active service and is enjoying a tranquil life in Jamaica. His peace is short-lived when his old friend Felix Leiter from the CIA turns up asking for help. The mission to rescue a kidnapped scientist turns out to be far more treacherous than expected, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.',
        images: {
            mainImg: '/public/assets/images/details/no_time_to_die_post.jpeg',
            backgroundImg: '/public/assets/images/details/no_time_to_die_background.jpeg',
            others: []
        },
        releaseDate: new Date('September 30, 2021 00:00:00'),
        runtimeInSecs: 9780,
        IMDBRating: '88%',
    };
    return res.json({success: true, movieDetail});
}

module.exports.movieDetail_Cast = async (req, res) => {
    const id = req.body.id;
    // Temporary Data Only for test
    //const movieDetail;
    const castinfo = [
        {
            imgSrc: "/public/assets/images/details/daniel_craig.jpeg",
            castName: 'Daniel Craig01',
            characterName: 'James Bond'
        },
        {
            imgSrc: '/public/assets/images/details/daniel_craig.jpeg',
            castName: 'Daniel Craig02',
            characterName: 'James Bond'
        },
        {
            imgSrc: '/public/assets/images/details/daniel_craig.jpeg',
            castName: 'Daniel Craig03',
            characterName: 'James Bond'
        },
        {
            imgSrc: '/public/assets/images/details/daniel_craig.jpeg',
            castName: 'Daniel Craig04',
            characterName: 'James Bond'
        },
        {
            imgSrc: '/public/assets/images/details/daniel_craig.jpeg',
            castName: 'Daniel Craig05',
            characterName: 'James Bond'
        },
        {
            imgSrc: '/public/assets/images/details/daniel_craig.jpeg',
            castName: 'Daniel Craig06',
            characterName: 'James Bond'
        },
        {
            imgSrc: '/public/assets/images/details/daniel_craig.jpeg',
            castName: 'Daniel Craig07',
            characterName: 'James Bond'
        }
    ];
    return res.json({success: true, castinfo});
}

module.exports.movieDetail_Reviews = async (req, res) => {
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
    req.user = null;
    req.session.user = null;
    req.session.loggedIn = false;
    req.flash('toastMessage', 'Thanks for visiting. See you soon');
    req.flash('toastStatus', 'success');
    res.redirect('/');
};
