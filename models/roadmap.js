const mongoose = require('mongoose');
const {Schema} = mongoose;

const roadmapSchema = new Schema({
    topic:{
        type:String,
        required:true
    },
    roadmap:{
        type:JSON,
        required:true
    }
});


module.exports = new mongoose.model("Roadmap", roadmapSchema);