const staticRoutes = require('./static');
const userRoutes = require('./user');
const detailsRoutes = require('./details');
const theaterRoutes = require('./theater');

const initRoutes = function (app) {
    console.log("Initializing Routes...");

    app.use('/', staticRoutes); // Static + Home + Auth
    app.use('/users', userRoutes); // Users
    app.use('/details', detailsRoutes); //Details
    app.use('/theater', theaterRoutes); // Theater

    // Ending Routes
    console.log('Finished Initializing Routes...');
}

module.exports = initRoutes;
