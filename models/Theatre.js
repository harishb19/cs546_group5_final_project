const mongoose = require("mongoose");
const {ObjectId, Timestamp, Binary} = require("mongodb");

const theatreSchema = new mongoose.Schema({
    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        default: ObjectId()
    },
    theatreName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },

    screens: [{
        movieFormat: {
            type: String,
            required: true,
        },
        layout: [{
            type: Binary
        }],
        totalNoOfSeats: {
            type: Number,
            required: true,
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
                    type: Binary
                }],
                price: {
                    type: Number,
                    required: true
                },
            }

            ]
        }]
    }],
    releaseDate: {
        type: Date,
        required: true
    },

    runtimeInSecs: {
        type: Number,
        required: true
    },
    IMDBRating: {
        type: String,
        required: true
    }


}, {
    timestamps: true
})
module.exports = mongoose.model('Theatre', theatreSchema);
