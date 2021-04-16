
var express = require('express');
var router = express.Router();
const bcrypt = require ("bcryptjs");
const Users = require('../models/users')
const bodyParser = require("body-parser");
const { findById, findByIdAndUpdate, findByIdAndDelete } = require('../models/users');
const jwt = require("jsonwebtoken");

const auth = require("../strategies/auth_token.js")

//get route
/**
 * returning all the users
 * @param {*} req 
 * @param {Users} res  
 */
router.get('/', auth,  function (req, res) {
  Users.find()
  .then(Users => res.json(Users))
  .catch(err => res.status(404).json({message: err}))
});

//get route
router.get('/:id', function (req, res) {
  Users.findById(req.params.id)
  .then(Users => res.json(Users))
  .catch(err => res.status(404).json({message: err}))
});


//-------------------
router.post('/', (req, res) => {

  // body data
  const {firstName, lastName, location, email,sigupcode, password} = req.body;
  //validation
  if(!firstName || !lastName || !location || !email || !sigupcode || !password ){
    return res.status(400).json({message: "Please enter all feilds"});
  }
// finding by email 
Users.findOne({email})
  .then(user => {
  // checking if user alreay exists
   if (user) return res.status(400).json({message:"User already exists"});
    const newUsers = new Users({
    firstName, 
    lastName, 
    location,
    email,
    sigupcode, 
    password
    });
  
    //Create salt & Hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUsers.password, salt, (err, hash) =>{
        if (err) throw err;
        newUsers.password = hash;
        // saving the user
        newUsers.save()
          .then(user => {
                //  token = authtoken(user);
                  res.json({
                    // token, 
                    user:{
                      id: user.id,
                      firstName: user.firstName, 
                      email: user.email
                    }
                  });
            });    
      })
    })

  });


  function authtoken(user){
    var token = jwt.sign(
        { id: user.id },
         "thesecretkey", 
         {expiresIn:3700})
    return token;
}
  // const newUsers = new users({

  //   FirstName: req.body.FirstName,
  //   SecondName:req.body.lastName, 
  //   Email:req.body.email, 
  //   Sigupcode:req.body.sigupcode, 
  //   PasswHash:req.body.phash, 

  // });
  // newUsers.save()
  // .then(users => res.json(users))
  // .catch(err => res.status(403).json({message: err}))
})


//-------------------
// router.put('/:id', auth,  function (req, res) {
//   const {firstName, lastName, email} = req.body;

//   Users.findByIdAndUpdate(req.params.id, {
// //what i what to update
//     firstName, 
//     lastName, 
//     email,
//  })
//  .then(res.status(201).json({message: "User Updated"}))
//  .catch(err => res.status(403).json({message: err}))
// })


// //----------------------------------
// router.delete('/:id', function (req, res) {
//   users.findByIdAndDelete(req.params.id)
//   .then(res.status(404).json({message: "deleted"}))
//  .catch(err => res.status(403).json({message: err}))
// })





module.exports = router;


















