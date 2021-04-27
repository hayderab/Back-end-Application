

var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require('../models/users')
const bodyParser = require("body-parser");
const { findById, findByIdAndUpdate, findByIdAndDelete } = require('../models/users');

const auth = require("../strategies/auth_token.js")


/**
 * authentication route 
 * @param {Json} req get user email and password
 * @param {Json} res send userId along with sigupcode.
 * @returns 
 */
router.post('/', async (req, res) => {
  // body data
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all feilds" });
  }
  await Users.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ message: "User does not exists" });
      //validating password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({ message: "invalid crendentials" })
          token = authtoken(user);
          res.status(200)
            .cookie('token', token, {
              sameSite: "strict",
              path: '/',
              httpOnly: true
            }).json({
              userId: user.id,
              sigupcode: user.sigupcode,
              message: "login Successful."
            })
        })
    });
});


router.get("/logout", (req, res) => {
  res.clearCookie('token').json({ message: "cookie deleted" })
})



/**
 * Post required for checking if the user is logged in through cookie.
 * @param {cookie} req request cookie for checking if user logged in
 * @param {Json} res  return json wiht true and false based on if user logged in
 */
router.post("/logedin",async (req, res) => {
  // get the token from the cookie. 
  const token = req.cookies.token;
  // checking the token...
  if (!token) {
    // chekcing if the not token is there if not send false.. 
    res.status(202).json(false);
  }
  else {
    //verifying token
    const decode = jwt.verify(token, "thesecretkey");
    // add the user from payload. 
    await Users.findById(decode.id)
      .then(user => {
        if (user.sigupcode === "600cem") {
          res.json({ "sigupcode": true, "login": true });
        }
        else {
          res.json({ "sigupcode": false, "login": true });
        }
      }).catch(err => res.status(403).json({ message: err }))
    // res.send(true)
  }

});

/**
 * 
 * @param {userid} user getting user id
 * @returns generating token and adding user id.
 */
function authtoken(user) {
  var token = jwt.sign(
    { id: user.id },
    // "thesecretkey", 
    process.env.Jwt_key,                  
    { expiresIn: 50000 })
  return token;
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
