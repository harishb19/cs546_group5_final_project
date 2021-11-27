const express = require('express');
require('dotenv').config();
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);
let cors = require('cors');
const exphbs = require("express-handlebars");
require('./passport')(passport);

const initMiddleware = (app) => {

    const static = express.static(__dirname + '/public');

    const handlebarsInstance = exphbs.create({
        defaultLayout: 'main/index',
        helpers: {
            asJSON: (obj, spacing) => {
                if (typeof spacing === 'number')
                    return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

                return new Handlebars.SafeString(JSON.stringify(obj));
            },
            section(name, options) {
                if (!this._sections) {
                    this._sections = {};
                }
                this._sections[name] = options.fn(this);
                return null;
            },
        }
    });

    app.use;
    app.use(logger('dev'));
    app.use(cors());
    app.use(flash());
    app.use(express.json());
    app.use('/public', static);
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.engine('handlebars', handlebarsInstance.engine);
    app.set('view engine', 'handlebars');
    app.use(session({
        secret: '1cd9589eeee9a628ff35a9e4ba3607ed',
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge: 2628000000}
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    // Usage variables
    app.use(function (req, res, next) {
        res.locals.req = req;
        res.locals.session = req.session;
        res.locals.toastMessage = req.flash('toastMessage');
        res.locals.toastStatus = req.flash('toastStatus');
        if (res.locals.toastMessage != "" && res.locals.toastStatus != "") {
            console.log('Flash Message: ' + res.locals.toastMessage + ' ' + res.locals.toastStatus);
        }
        next();
    });
    // //DB
    const store = new MongoDBStore({
        uri: process.env.DB_URI,
        collection: 'sessions'
    });
    // app.use(store)

}

module.exports = initMiddleware
