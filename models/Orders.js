const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");

const orderSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        default: ObjectId()
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies',
        required: true
    },
    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theatre',
        required: true
    },
    showTimeId: {
        type: String,
        required: true
    },
    seats: [
        {type: String, required: true}
    ],
    price: {
        type: String,
    }


}, {
    timestamps: true
})
const orders = new mongoose.Schema({
    type: {type: String, required: true},
    data: String
});
module.exports = mongoose.model('Orders', orderSchema);
