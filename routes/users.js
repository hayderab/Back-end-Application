
var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require('../models/users')
const bodyParser = require("body-parser");
const { findById, findByIdAndUpdate, findByIdAndDelete } = require('../models/users');
const jwt = require("jsonwebtoken");
const authRole = require("../permissions/role");
const {authController, Loggedin} =  require("../controllers/authController")
// const loggedin =  require("../controllers/authfun")

const auth= require("../strategies/auth_token.js")
const Dogs = require('../models/dogs')

//get route
/**
 * returning all the users
 * @param {*} req 
 * @param {Users} res  
 */

// router.get('/',  auth,function (req, res) {
//   Users.find()
//     .then(Users => res.json(Users))
//     .catch(err => res.status(404).json({ message: err }))
// });

// get route
// router.get('/:id', function (req, res) {
//   Users.findById(req.params.id)
//     .then(Users => res.json(Users))
//     .catch(err => res.status(404).json({ message: err }))
// });

router.post('/login', authController);

router.get("/logout", (req, res) => {
  res.clearCookie('token').json({ message: "cookie deleted" })
})


router.post("/loggedin", Loggedin)


router.get('/', auth, (req, res) => {
  Users.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

//-------------------
router.post('/', async (req, res) => {

  // body data
  const { firstName, lastName, location, email, sigupcode, password } = req.body;
  //validation
  if (!firstName || !lastName || !location || !email  || !password) {
    return res.status(400).json({ message: "Please enter all feilds" });
  }
  // finding by email 
 await Users.findOne({email})
    .then(user => {
      // checking if user alreay exists
      if (user) return res.status(400).json({ message: "User already exists" });
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
        bcrypt.hash(newUsers.password, salt, (err, hash) => {
          if (err) throw err;
          newUsers.password = hash;
          // saving the user
          newUsers.save()
            .then(user => {
              //  token = authtoken(user);
              res.status(201).json({
                // token, 
                user: {
                  id: user.id,
                  firstName: user.firstName,
                  email: user.email
                }
              })
            });
        })
      })

    });

})

router.post('addtofav/:id', auth, async function (req, res) {
      
  // console.log(decode.id)
  const uId = userId(req);
  let fav = await Users.findOne({ _id: uId}).populate("favorites").select("favorites");
  let dog = Dogs.findById(req.params.id);
  if(!dog){
    res.JSON({message:"dog does not exit"});
  }
  var dogId = req.params.id;
  await Users.updateOne({ _id: uId }, {
    $addToSet: {
      favorites: dogId
    }
  })
    .then(res.json({ message: "Added dogs to favourites" }))
    .catch(err => res.status(403).json({ message: err }))
})


router.get('/getfav', auth,  async function (req, res){
  const id = userId(req);
  try{
  //  const token = req.cookies.token;
  //  const decode = jwt.verify(token, "thesecretkey");
   await Users.findOne({ _id:id})
  .populate("favorites")
  .select("favorites")
  .then(fav =>{
    res.status(200).json(fav.favorites)
  }).catch(err => res.status(404).json({ message: err }))
  } catch(err){
      res.json({message:"err"})
  }
});




/**
 * Getting the user Id from a cookie
 * @param {req} req getting tooken for the cookie
 * @returns  users Id
 */
function userId(req){
  const token = req.cookies.token;
  const decode = jwt.verify(token, "thesecretkey");
  return decode.id
}





// //----------------------------------
// router.delete('/:id', function (req, res) {
//   users.findByIdAndDelete(req.params.id)
//   .then(res.status(404).json({message: "deleted"}))
//  .catch(err => res.status(403).json({message: err}))
// })





module.exports = router;


















