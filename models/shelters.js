
const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const SheltersSchema = new Schema({
  Name: String, 
  Location:String, 
});
module.exports = shelters = mongoose.model('shelters', SheltersSchema);











