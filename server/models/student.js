const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const studentSchema = new Schema({
    name: {
      type: String,
      default: "",
      required: true,  
    },
    password: {
      type: String,
      default: "",
      required: true,  
    },
    schoolId: {
      type: String,
      default: "",
      required: true,  
    },
    eventId: {
      type: String,
      default: "",
    },
    upcomingEvent: {
      type: {id: String, state: String},
      default: {id: '', state: 'pending'}
    },
    userDate: {
      type: String,
      default: "",
    },
})

studentSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  
studentSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
  
module.exports = mongoose.model('Student', studentSchema );