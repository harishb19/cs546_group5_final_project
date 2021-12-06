const {ObjectId, Timestamp, Binary} = require("mongodb");
const {Schema} = require("mongoose");

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
        screenId: {
            type: mongoose.Schema.Types.ObjectId,
            unique: true,
            default: ObjectId()
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


    }]


}, {
    timestamps: true
})
module.exports = mongoose.model('Theatre', theatreSchema);
