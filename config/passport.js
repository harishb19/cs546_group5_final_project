require('https').globalAgent.options.rejectUnauthorized = false;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/Users');

module.exports = (passport) => {

    // Serialize the user for the sesison
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Used to unserialize the user
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    const callback = "/oauth/signin/callback";
    passport.use(new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: callback,
            passReqToCallback: true
        },
        (req, accessToken, refreshToken, profile, done) => {
            User.findOne({'email': profile.emails[0].value}, (error, user) => {
                if (error) {
                    return done(error);
                } else if (user) {
                    console.log(profile);
                    req.session.user = user;
                    req.session.imageUrl = profile['_json']['picture'];
                    req.session.loggedIn = true;
                    req.session.newUser = false;
                    req.session.role = user.role;
                    req.flash('toastStatus', 'success');
                    req.flash('toastMessage', 'Hey ' + profile.name.givenName + ', welcome back!');
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
    ));

};
