module.exports.home = function (req, res, next) {    res.render('profile');}module.exports.history = function (req, res, next) {    res.render('orders');}module.exports.active = function (req, res, next) {    res.render('tickers');}