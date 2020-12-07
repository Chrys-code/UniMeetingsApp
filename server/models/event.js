const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eventSchema = new Schema({
    creator: {
        type:String,
        default: ""
    },
    location: {
        type: String,
        default: "",
    },
    date: {
        type:String,
        default:""
    },
    students: [{
        _id: {type: String},
        name: {type: String},
        accepted:{type: Boolean, default: null},    
    }],
})

module.exports = mongoose.model('Event', eventSchema)


