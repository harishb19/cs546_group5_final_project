const staticRoutes = require('./static');
const userRoutes = require('./user');
const detailsRoutes = require('./details');
const theaterRoutes = require('./details');

const initRoutes = function (app) {
    console.log("Initializing Routes...");

    app.use('/', staticRoutes); // Static + Home + Auth
    app.use('/users', userRoutes); // Users
    app.use('/details', detailsRoutes); //details
    app.use('/theater', theaterRoutes)

    // Ending Routes
    console.log('Finished Initializing Routes...');
}

module.exports = initRoutes;
