const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const Schema = mongoose.Schema;
/**
 * Users  schema, contains dogs
 * @constructor Users
 */
const userSchema = new Schema({
  firstName: {
    type: String,
    description:"User first Name", 
    required: [true, "Please enter the frist name"], 
  },
  lastName: {
    type: String,
    description:"User Last Name", 
    required: [true, "Please enter the Last Name"]
  },
  location: {
    type: String,
    description: "Please enter the location", 
    required: [true, "Please enter the location"]
  },
  email: {
    type: String,
    description: "User Email",
    required: [true, "Please enter the email"], 
    unique:true
  },
  sigupcode: {
    type: String, 
    default: "normaluser",
    description:"please enter the sigup code"
  },
  password: {
    type: String,
    required: [true, "please enter minmum 8 character password"],
    description:"User password",
    minLength:[8, "Mimum password lenght is 8 characters"]
  },
  // favorites: [{
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Dogs"
  // }],
  dataCreated: {
    type: Date,
    default: Date.now
  }


});
module.exports = users = mongoose.model('users', userSchema);
// const jsonSchema = userSchema.jsonSchema();
// console.log(jsonSchema);






