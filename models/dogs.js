const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Dogs  schema, contains dogs
 * @constructor Dogs
 */
const DogsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  type: {
    type: String,
    required: [true, "Type is required"]
  },
  location: {
    type: String,
    required: [true, "Location required"]
  },
  avilable: {
    type: Boolean,
    required: [true, "Is dog avialble"]
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


// require('mongoose-schema-jsonschema')(mongoose);
// const jsonSchema = DogsSchema.jsonSchema();
// console.log(jsonSchema);






















