

var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require('../models/users')
const bodyParser = require("body-parser");
const { findById, findByIdAndUpdate, findByIdAndDelete } = require('../models/users');

const auth = require("../strategies/auth_token.js")


router.post('/', (req, res) => {
  // body data
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all feilds" });
  }
  Users.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ message: "User dosnot exists" });
      //validating password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({ message: "invalid crendentials" })
          token = authtoken(user);
          res.status(202)
            .cookie('token', token, {
              sameSite: "strict",
              path: '/',
              httpOnly: true
            }).json({
              sigupcode: user.sigupcode,
              message: "login Successful."
            })
        })


    });
});

router.get("/logout", (req, res) => {
  res.clearCookie('token').json({ message: "cookie deleted" })
})


router.post("/logedin", (req, res) => {
  // get the token from the cookie. 
  // console.log(role);
  const token = req.cookies.token;
  console.log(token);
  // checking the token...
  if (!token) {
    // chekcing if the not token is there if not send false.. 
    res.status(202).json(false);
  }
  try {

    //verifying token
    const decode = jwt.verify(token, "thesecretkey"); 
        // add the user from payload. 
    // add the user from payload.
    console.log(decode.id) 
    // console.log(role)

    Users.findById(decode.id)
    .then( user => {
      if(user.sigupcode == "600cem"){
        res.json({"sigupcode": true, "login":true});
      }
      else{
        res.json({"sigupcode": false, "login":true});
      }
    })
    // console.log("tokin decoding.....................")

    // res.send(true)
  } catch (err) {
    //if cookie not found send not logedin.
    res.json({message:"failed"})
  }
});




function authtoken(user) {
  var token = jwt.sign(
    { id: user.id },
    "thesecretkey",
    { expiresIn: 5000 })
  return token;
}



function sigupcode(id){

//  const user =  Users.findById(id);
//  if(user.sigupcode == "600cem"){
//   return true

//  }
//  return false
   
}

//@route Get api/auth/user
//@desc Auth user
//@access private
router.get('/users', auth, (req, res) => {
  Users.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));

});




module.exports = router;
