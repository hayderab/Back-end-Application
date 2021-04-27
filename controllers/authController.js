
var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require('../models/users')
const bodyParser = require("body-parser");


/**
 * Gets user password and email from body and send after authencitation response.
 * @module controller/authController
 * @param {Object} req email, password
 * @param {Object} res sends json response 
 * @returns 
 */
exports.authController = async  function (req, res) {
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
};

/**
 * Checking if the user is logged in through cookie
 * @module controller/authController
 * @param {Object} req cookie
 * @param {Object} res sends json response with sigupcode status and authstate.
 * @returns 
 */
exports.Loggedin = async function (req, res) {
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

}

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


// module.exports = authfun