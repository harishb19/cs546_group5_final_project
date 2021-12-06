const formidable = require("formidable");
const User = require("../../models/Users");
const bcrypt = require('bcrypt');
const {models} = require("mongoose");
const saltRounds = 10;

const registration = (req, res) => {
    const form = formidable({multiples: true});
    form.parse(req, (err, fields, files) => {

        if (fields.firstName === "" || fields.lastName === "" || fields.email === "" || fields.gender === undefined || fields.dateOfBirth === "" || fields.phoneNo === "" || fields.password === "" || err) {
            req.flash('toastMessage', `Please enter all the details`);
            res.redirect("back")
        } else {


            const user = new User({
                firstName: fields.firstName,
                lastName: fields.lastName,
                email: req.session.user.email,
                imageUrl: req.session.imageUrl,
                gender: fields.gender,
                dateOfBirth: fields.dateOfBirth,
                phoneNo: fields.phoneNo,
            });
            bcrypt.hash(fields.password, saltRounds, (err, hash) => {
                user.password = hash
                user.save((err, doc) => {
                    if (err) {
                        console.log(err);
                        req.flash('toastMessage', `some error try again`);
                        res.redirect("back")
                    } else {
                        req.session.newUser = false;
                        req.flash('toastMessage', `some error try again`);
                        req.flash('toastStatus', `success`);
                        res.redirect('/');
                    }
                });
            });

        }
    });
}

const checkUserByEmail = (req, accessToken, refreshToken, profile, done) => {
    User.findOne({'email': profile.emails[0].value}, (error, user) => {
        if (error) {
            return done(error);
        } else if (user) {
            req.session.user = user;
            req.session.imageUrl = profile['_json']['picture'];
            req.session.loggedIn = true;
            req.session.newUser = false;
            req.flash('toastStatus', 'success');
            req.flash('toastMessage', `Hey ${user.firstName} ${user.lastName}, welcome back!`);
            return done(null, user);
        } else {
            req.session.newUser = true;
            req.session.loggedIn = true;
            req.session.user = profile;
            req.session.user.name = profile.displayName;
            req.session.user.email = profile.emails[0].value;
            req.session.user.imageUrl = profile.photos[0].value;
            req.session.imageUrl = profile['_json']['picture'];
            return done(null, null);

        }
    });
}
const checkUserByEmailPassword = (req, res) => {
    const form = formidable({multiples: true});
    form.parse(req, (err, fields, files) => {

        if (fields.email === "" || fields.password === "") {
            req.flash('toastMessage', `Please enter all the details`);
            res.redirect("back")
        } else {
            User.findOne({'email': fields.email}, (error, user) => {
                if (error) {
                    console.log("mo user wur", error)
                    req.flash('toastMessage', `email or password incorrect`);
                    res.redirect("back")

                } else if (user) {
                    bcrypt.compare(fields.password, user.password, (err, result) => {
                        if (err || !result) {
                            console.log("mo user wur", err)
                            req.flash('toastMessage', `email or password incorrect`);
                            res.redirect("back")
                        } else {
                            req.session.user = user;
                            req.session.imageUrl = user.imageUrl;
                            req.session.loggedIn = true;
                            req.session.newUser = false;
                            req.flash('toastStatus', 'success');
                            req.flash('toastMessage', `Hey ${user.firstName} ${user.lastName}, welcome back!`);
                            res.redirect("/")
                        }

                    });

                } else {
                    console.log("mo user")
                    req.flash('toastMessage', `email or password incorrect`);
                    res.redirect("back")

                }
            });

        }
    });

}
const checkUserById = (id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
}
module.exports = {
    registration, checkUserByEmail, checkUserByEmailPassword, checkUserById
}
