const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
    name: String,
});

module.exports = mongoose.model('School', schoolSchema)