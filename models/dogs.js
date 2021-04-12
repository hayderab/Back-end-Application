const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DogsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  avilable: {
    type: Boolean,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  }

});
module.exports = dogs = mongoose.model('dogs', DogsSchema);
























