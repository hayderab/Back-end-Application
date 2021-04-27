
const mongoose = require('mongoose');
const  Schema = mongoose.Schema;
// // https://stackoverflow.com/questions/26936645/mongoose-private-chat-message-model/49499371



// const MessageSchema =  new Schema({
//   message:{
//       text: { type:String, required:true }
//       // you can add any other properties to the message here.
//       // for example, the message can be an image ! so you need to tweak this a little
//   },
//   users:[{
//       user: { type:mongoose.Schema.Types.ObjectId, ref:'users', required:true }
//   }],
//   sender: {type: mongoose.Schema.Types.ObjectId, ref:'users', required:true },
//   read: { type:Date }

// });
// module.exports = Message = mongoose.model('Message', MessageSchema);



const partipentsSchema = mongoose.Schema({

  users: [{
      type: mongoose.Schema.Types.ObjectID,
      ref: 'users'
  }],
  topic: {
      type: {},
      required: true
  }

}, {
  timestamps: true
})

module.exports = partipents = mongoose.model("partipents", partipentsSchema);








