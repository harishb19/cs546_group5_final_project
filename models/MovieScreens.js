const {ObjectId, Timestamp, Binary} = require("mongodb");
const {Schema} = require("mongoose");
const mongoose = require("mongoose");

const movieScreensSchema = new Schema({
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
                type: Date,
                required: true,
            },
            date: {
                type: Date,
                required: true
            },
            time: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            availability: {
                type: Map,
                of: String
            }
        }]
    }],
}, {
    timestamps: true
})
module.exports = mongoose.model('MovieScreens', movieScreensSchema);