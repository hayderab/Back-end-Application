

var express = require('express');
var router = express.Router();
const bcrypt = require ("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require('../models/users')
const bodyParser = require("body-parser");
const { findById, findByIdAndUpdate, findByIdAndDelete } = require('../models/users');

const auth = require("../strategies/auth_token.js")


router.post('/', (req, res) => {

    // body data
    const { email,password} = req.body;
    //validation
    if(!email ||  !password )
    {
      return res.status(400).json({message: "Please enter all feilds"});
    }

    Users.findOne({email})
    .then(user => {
        if (!user) return res.status(400).json({message:"User dosnot exists"});
        //validating password
        bcrypt.compare(password, user.password)
            .then(isMatch =>{
                if(!isMatch) return res.status(400).json({message:"invalid crendentials"})
                token = authtoken(user);
                // res.json({
                //     token,
                //     user:{
                //       id: user.id,
                //       email: user.email
                //     }
                //   });
              res.status(202)
              .cookie('token', token, {
                  sameSite: "strict",
                  path: '/' , 
                  httpOnly:true
                  }).json({"message": "login Sucessful"})

            })

 
  });
});

function authtoken(user){
  var token = jwt.sign(
      { id: user.id },
       "thesecretkey", 
       {expiresIn:5000})
  return token;
}

//@route Get api/auth/user
//@desc Auth user
//@access private

router.get ('/users', auth, (req, res) => {
  Users.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));

});
module.exports = router;
