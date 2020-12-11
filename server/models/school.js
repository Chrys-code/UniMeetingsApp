const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
    name: {type: String},
    password: {type: String }
});

module.exports = mongoose.model('School', schoolSchema)