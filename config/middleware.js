const express = require('express');
require('dotenv').config();
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
let cors = require('cors');
const exphbs = require("express-handlebars");
const path = require("path");
require('./passport')(passport);
const {format, formatDistance} = require('date-fns');


const initMiddleware = (app) => {

    // const static = express.static('public');
    const handlebarsInstance = exphbs.create({
        defaultLayout: 'main/index', helpers: {
            asJSON: (obj, spacing) => {
                if (typeof spacing === 'number') return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

                return new Handlebars.SafeString(JSON.stringify(obj));
            },
            stringifyJson: (object) => {
                console.log(object)
                object = JSON.stringify(object)
                console.log(object)

                return object;
            }, split: (string, separator) => {
                return string.split(separator)
            }, isEqual: (string1, string2) => {
                return string1 === string2
            }, splice: (string, start, end) => {

                return string.slice(start, end)
            }, accessElement: (array, index) => {
                return array[index]
            }, dateParser: (date) => {
                return format(new Date(date), 'do MMM yy')
            }, timeParser: (date) => {
                return format(new Date(date), 'hh:mm a')
            }, secondsParser: (seconds) => {
                return formatDistance(0, seconds * 1000, {includeSeconds: false})
            }, section(name, options) {
                if (!this._sections) {
                    this._sections = {};
                }
                this._sections[name] = options.fn(this);
                return null;
            },


        }
    });
    handlebarsInstance.getPartials().then(r => console.log(r))
    app.use;
    app.use(logger('dev'));
    app.use(cors());
    app.use(flash());
    app.use(express.json());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.engine('handlebars', handlebarsInstance.engine);
    app.set('view engine', 'handlebars');

    app.use('/public', express.static(path.join(__dirname, '../public')));
    app.use(session({
        secret: '1cd9589eeee9a628ff35a9e4ba3607ed', resave: true, saveUninitialized: true, cookie: {maxAge: 2628000000}
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // Usage variables
    app.use(function (req, res, next) {
        res.locals.req = req;
        res.locals.session = req.session;
        res.locals.toastMessage = req.flash('toastMessage');
        res.locals.toastStatus = req.flash('toastStatus');
        if (res.locals.toastMessage !== "" && res.locals.toastStatus !== "") {
            console.log('Flash Message: ' + res.locals.toastMessage + ' ' + res.locals.toastStatus);
        }
        next();
    });


}

module.exports = initMiddleware
