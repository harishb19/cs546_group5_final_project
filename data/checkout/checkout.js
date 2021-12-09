const {isValidObjectId} = require("mongoose");
const checkout = () => {

}
const bodyCheck = (req) => {
    if (!req.body) throw 'Error: Request body empty';
    if (!req.body['Purchase Summary']) throw 'Error: Request body empty'
}
const elementValidation = (movieId,
                           movieName,
                           theatreId,
                           theatreName,
                           dateTime,
                           noOfSeats,
                           seats,
                           showTimeId,
                           price) => {
    if (!movieId || !movieName || !theatreId || !theatreName || !dateTime || !noOfSeats || !seats || !showTimeId || !price) throw 'Error: Missing data in Purchase Summary';

    if (!isValidObjectId(movieId)) throw 'Error: movieId is not a valid ObjectId';
    if (!isValidObjectId(theatreId)) throw 'Error: theatreId is not a valid ObjectId';
    if (typeof movieName !== 'string') throw 'Error: movieName not of type string';
    if (typeof theatreName !== 'string') throw 'Error: theatreName not of type of string';
    if (!new Date(dateTime)) throw 'Error: dateTime cannot be converted to type Date';
    if (typeof noOfSeats !== 'number') throw 'Error: noOfSeats not of type of number';
    if (!Array.isArray(seats)) throw 'Error: seats is not an array';
    if (!new Date(showTimeId)) throw 'Error: showTimeId cannot be converted to type Date';
    if (!parseFloat(price)) throw 'Error: price cannot be parsed to Float';
}
const checkoutHandler = (req, res) => {
    try {
        /*------------ Error Handling Start ------------*/
        bodyCheck(req)

        const {
            movieId,
            movieName,
            theatreId,
            theatreName,
            dateTime,
            noOfSeats,
            seats,
            showTimeId,
            price
        } = JSON.parse(req.body['Purchase Summary']);

        elementValidation(movieId,
            movieName,
            theatreId,
            theatreName,
            dateTime,
            noOfSeats,
            seats,
            showTimeId,
            price)
        /*------------ Error Handling End ------------*/

        const purchaseSummary = {
            movieId: movieId,
            movieName: movieName,
            theatreId: theatreId,
            theatreName: theatreName,
            dateTime: dateTime,
            noOfSeats: noOfSeats,
            seats: seats,
            showTimeId: showTimeId,
            price: price,
            totalAmount: parseFloat(price) * noOfSeats
        }


        res.render('pages/checkout/orderSummary', {purchaseSummary});
    } catch (e) {
        console.log(e);
        req.flash("Invalid request")
        res.redirect('back')
    }

}
module.exports = {
    checkoutHandler
}
