const {ObjectId, Timestamp, Binary} = require("mongodb");
const {Schema} = require("mongoose");
const mongoose = require("mongoose");

const moveScreensSchema = new Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        default: ObjectId()
    },
    screens: [{
        screenId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        showTime: [{
            showTimeId: {
                type: Timestamp,
                required: true,
            },
            date: {
                type: Date,
                required: true
            },
            availability: [{
                time: {
                    type: String,
                    required: true
                },
                noOfSeats: [{
                    type: Map,
                    of: String
                }],
                price: {
                    type: Number,
                    required: true
                },
            }]
        }]
    }],
}, {
    timestamps: true
})
module.exports = mongoose.model('MoveScreens', moveScreensSchema);
