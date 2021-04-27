const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);


/**
 * Message  schema, contains Messages
 * @constructor Messages
 */
const MessageSchema = mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'users'
    },

    messsageid: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'partipents'
    },
    text: {
        type: String,
        maxLength: 200,
        required: true,
    },
}, {
    timestamps: true
})



// exports.partipents = mongoose.model("partipents", partipentsSchema);
module.exports = Message = mongoose.model('Message', MessageSchema);

// const jsonSchema = MessageSchema.jsonSchema();
// console.log(jsonSchema);