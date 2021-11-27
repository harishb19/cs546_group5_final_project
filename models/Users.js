const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        default:ObjectId()
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'others']
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    orders: [{
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            unique: true,
            required: true,
            default: ObjectId()
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
    }],

}, {
    timestamps: true
})
module.exports = mongoose.model('Users', userSchema);
