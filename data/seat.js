const {ObjectId} = require("mongodb");

const Theatre = require('../models/Theatre');
const Movie = require('../models/Movies');
const MovieScreens = require('../models/MovieScreens');

module.exports = {

    async seatSelection(movieId, theatreId, screenId, showTimeId) {

        /*------------ Error Handling Start ------------*/

        if (! ObjectId.isValid(movieId)) throw 'Error: movieId is not valid Object ID';
        if (! ObjectId.isValid(theatreId)) throw 'Error: theatreId is not valid Object ID';
        if (! ObjectId.isValid(screenId)) throw 'Error: screenId is not valid Object ID';
        if (! new Date(showTimeId)) throw 'Error: showTimeId is not valid TimeStamp'; //Check Once again

        /*------------ Error Handling End ------------*/

        let movie = await Movie.findOne({movieId: ObjectId(movieId) });
        let theatre = await Theatre.aggregate([
            {"$unwind": "$screens"}, {"$match": {"screens.screenId": ObjectId(screenId)}}
        ]);

        let showTime = await MovieScreens.aggregate([
            {"$unwind": "$screens"},
            {"$unwind": "$screens.showTime"},
            {"$match": {
                    $and: [{
                        "movieId": ObjectId(movieId),
                        "screens.screenId": ObjectId(screenId),
                        "screens.showTime.showTimeId": new Date(showTimeId)
                    }]
                }
            },
        ]);

        const bookingData = {
            movieId: movieId,
            movieName: movie.movieName,
            theatreId: theatreId,
            theatreName: theatre[0].theatreName,
            layout: theatre[0].screens.layout,
            availability: showTime[0].screens.showTime.availability,
            showtime: showTime[0].screens.showTime.showTimeId,
            language: movie.language,
            price: showTime[0].screens.showTime.price
        }
        return bookingData;
    }
}