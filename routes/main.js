const staticRoutes = require('./static');
const userRoutes = require('./user');

const initRoutes = function (app) {
    console.log("Initializing Routes...");

    app.use('/', staticRoutes); // Static + Home + Auth
    app.use('/users', userRoutes); // Users

    // Ending Routes
    console.log('Finished Initializing Routes...');
}

module.exports = initRoutes;
