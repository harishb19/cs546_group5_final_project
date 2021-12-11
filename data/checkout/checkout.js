const {isValidObjectId} = require("mongoose");
const movieScreens = require("../models/MovieScreens");

const bodyCheck = (req) => {
    if (!req.body) throw 'Error: Request body empty';
    if (!req.body['Purchase Summary']) throw 'Error: Request body empty'
}
const elementValidation = (movieId, movieImage, movieName, theatreId, theatreName, dateTime, noOfSeats, seats, showTimeId, price, runtime, language) => {
    if (!movieId || !movieImage || !movieName || !theatreId || !theatreName || !dateTime || !noOfSeats || !seats || !showTimeId || !price || !runtime || !language) throw 'Error: Missing data in Purchase Summary';

    if (!isValidObjectId(movieId)) throw 'Error: movieId is not a valid ObjectId';
    if (!isValidObjectId(theatreId)) throw 'Error: theatreId is not a valid ObjectId';
    if (typeof movieImage !== "string") throw 'Error: movieImage not a string'
    if (typeof movieName !== 'string') throw 'Error: movieName not of type string';
    if (typeof language !== 'string') throw 'Error: language not of type string';
    if (typeof runtime !== 'number') throw 'Error: runtime not of type number';
    if (typeof theatreName !== 'string') throw 'Error: theatreName not of type of string';
    if (!new Date(dateTime)) throw 'Error: dateTime cannot be converted to type Date';
    if (typeof noOfSeats !== 'number') throw 'Error: noOfSeats not of type of number';
    if (!Array.isArray(seats)) throw 'Error: seats is not an array';
    if (!new Date(showTimeId)) throw 'Error: showTimeId cannot be converted to type Date';
    if (!parseFloat(price)) throw 'Error: price cannot be parsed to Float';
}
const showPayDetails = (req, res) => {
    try {
        /*------------ Error Handling Start ------------*/
        bodyCheck(req)

        const {
            movieId,
            movieImage,
            movieName,
            theatreId,
            theatreName,
            dateTime,
            noOfSeats,
            seats,
            showTimeId,
            price,
            runtime,
            language
        } = JSON.parse(req.body['Purchase Summary']);

        elementValidation(movieId, movieImage, movieName, theatreId, theatreName, dateTime, noOfSeats, seats, showTimeId, price, runtime, language)
        /*------------ Error Handling End ------------*/

        const purchaseSummary = {
            movieId,
            movieImage,
            movieName,
            language,
            theatreId,
            theatreName,
            dateTime,
            noOfSeats,
            seats,
            showTimeId,
            price,
            runtime,
            totalAmount: parseFloat(price) * noOfSeats
        }


        res.render('pages/checkout/orderSummary', {purchaseSummary});
    } catch (e) {
        console.log(e);
        req.flash("Invalid request")
        res.redirect('back')
    }
}


const bookTicket = async (req, res) => {
    bodyCheck(req)
    const {
        movieId,
        movieImage,
        movieName,
        theatreId,
        theatreName,
        dateTime,
        noOfSeats,
        seats,
        showTimeId,
        price,
        runtime,
        language
    } = JSON.parse(req.body['Purchase Summary']);

    elementValidation(movieId, movieImage, movieName, theatreId, theatreName, dateTime, noOfSeats, seats, showTimeId, price, runtime, language)
    let updateSeat = movieScreens.findOneAndUpdate({
        $and: [
            {movieId},
            {"screens": {$elemMatch: {screenId}}}
        ]
    })


}

const showTicket = () => {

}

module.exports = {
    showPayDetails, bookTicket, showTicket
}
