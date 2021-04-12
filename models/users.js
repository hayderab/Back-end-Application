const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  sigupcode: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  dataCreated: {
    type: Date,
    default: Date.now
  }
});
module.exports = users = mongoose.model('users', userSchema);







