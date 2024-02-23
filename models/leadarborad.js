const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const {Schema} = mongoose;
import User from './user'

const leader = new Schema({
    username: {
        type: 
        Schema.Types.ObjectId,
        ref: {User},
    }, 
    points: {
        type: Number, 
        required: true, 
        default: 0,
    },
    level: {
        type: String, 
        required: true, 
        default: "Rookie", 
    }, 
    Rank: {
        type: Number, 
        required: true, 
    }
})


module.exports = new mongoose.model("Leader", leader);