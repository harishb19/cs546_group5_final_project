const {ObjectId, Timestamp, Binary} = require("mongodb");
const {Schema} = require("mongoose");
const mongoose = require('mongoose');

const theatreSchema = new Schema({
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
        layout: [[{
            type: Number,
            min: 0,
            max: 1
        }]],
        totalNoOfSeats: {
            type: Number,
            required: true,
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
            availability: [{
                time: {
                    type: String,
                    required: true
                },
                noOfSeats: {
                    type: Map,
                    of: String
                },
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
module.exports = mongoose.model('Theatre', theatreSchema);
