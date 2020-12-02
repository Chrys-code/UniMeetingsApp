const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = Schema({
    location: String,
    date: String,
    students: String,
})

module.exports = mongoose.model('Event', eventSchema)