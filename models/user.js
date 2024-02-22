const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true, 
    }, 
    password: {
        type: String, 
        required: true, 
        min: 8, 
        max: 16,
    }, 
    dob: {
        type: Date, 
        required: true, 
    }, 
    topic: {
        type: JSON,
        required: true, 
    }, 
    XP: {
        type: Number, 
        default: 0, 
    }, 
    Streak: {
        type: Number, 
        default: 0, 
    }
});


module.exports = new mongoose.model("User", userSchema);