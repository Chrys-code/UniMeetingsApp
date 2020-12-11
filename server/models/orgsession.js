const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrgSessionSchema = new Schema({
    orgId: {
        type: String,
        default: "",
      },
      timestamp: {
        type: Date,
        default: Date.now(),
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
})

module.exports = mongoose.model('OrgSession', OrgSessionSchema);