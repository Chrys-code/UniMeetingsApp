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
    students: {
            type: [String],
            default: [],    
    
    },
})

module.exports = mongoose.model('Event', eventSchema)


