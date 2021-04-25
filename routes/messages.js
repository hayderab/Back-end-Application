var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");

const Messages = require('../models/chat')
const participets = require('../models/partipents')
const Users = require('../models/users')
const bodyParser = require("body-parser");


router.post('/createmessage/', async function (req, res) {

       const sid = userId(req) // person that is logged in..
       const {id}  = req.query; // person the  message sent to.. 
       const {text}  = req.body; // message.. 
       const{topic} = req.body
   
       console.log("sending message to:", id);
       console.log("person sending message:", sid);

      const msg = await participets.findById(id); 
      if (!msg){
          const msg = new participets({
              // takes sender Id and reciver Id 
              users:[sid, id],
              topic
          });
      msg.save()
          .then(msg => res.json(msg))
          .catch(err = res.json({message:"error creating conversation"}))
      }
      const sendMessage = new Messages({
        messsageid:id,
        sender:sid,
        text:text
      }); 
      sendMessage.save()
      .then(message => res.json(message))
      .catch(err => res.status(403).json({ message: err }))
})

router.get('/getMessage', async function (req, res) {
    // const {senderId} = req.params;  //sender id..
    // const {id} = req.query;
    // const getMessage = await Messages.find({messsageid:id})
    const getMessage = await Messages.find()
    .sort({"_id":1})
    .populate("sender", "firstName")
    res.json(getMessage)
})


router.delete('/delete', async function(req, res){
    const {id} = req.query;
    Messages.findByIdAndDelete(id)
    .then(res.status(404).json({message: "deleted"}))
   .catch(err => res.status(403).json({message: err}))
})


router.get('/getAllmessages', async function (req, res){
   const uId = userId(req); 
   console.log(uId)
   const allMessages = await participets.find({users:uId})
   .populate("users", '_id')
   .sort({"_id":-1});
   res.send(allMessages)


})



function userId(req){
    const token = req.cookies.token;
    const decode = jwt.verify(token, "thesecretkey");
    return decode.id
  }
  
module.exports = router;


