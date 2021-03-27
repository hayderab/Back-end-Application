
var express = require('express');
var router = express.Router();

const Dogs = require('../models/dogs')
const bodyParser = require("body-parser");
const { findById, findByIdAndUpdate, findByIdAndDelete } = require('../models/dogs');

const auth = require("../strategies/auth_token.js")
const authRole = require("../permissions/role");



///@route Get api/dogs/
//@desc User and employee
//@access public
router.get('/', function (req, res) {
  Dogs.find()
    .then(dogs => res.json(dogs))
    .catch(err => res.status(404).json({message: err}))
});

//@route Get api/dogs/Id
//@desc User and employee
//@access private
router.get('/:id', function (req, res) {

  Dodgs.findById(req.params.id)
  .then(dogs => res.json(dogs))
  .catch(err => res.status(404).json({message: err}))
});

//@route Get api/dogs
//@desc Employee
//@access private
router.post('/', auth, authRole, (req, res) => {
//  firstname, lastName, email, sigupcode = req.body;
const {name, type, location,avilable} = req.body;
  const newdogs = new Dogs({
    name,
    type, 
    location,
    avilable

  });
  newdogs.save()
  .then(dogs => res.json(dogs))
  .catch(err => res.status(403).json({message: err}))
})

//@route Get api/dogs/update/id
//@desc Employee
//@access private
//-------------------
router.put('/update/:id', auth, authRole, function (req, res) {
  Dogs.findById(req.params.id)
  .then(dog => {
      dog.name =  req.body.name, 
      dog.type= req.body.type, 
      dog.location = req.body.location, 
      dog.avilable = req.body.avilable
      dog.save()
    .then(res.status(201).json({message: "Dog Updated"}))
    .catch(err => res.status(400).json({message: err}))
  })
  //what i what to update
    .catch(err => res.status(400).json({message: err}))

});


//----------------------------------
router.delete('/delete/:id',auth, authRole, function (req, res) {
  dogs.findByIdAndDelete(req.params.id)
  .then(res.status(404).json({message: "deleted"}))
 .catch(err => res.status(403).json({message: err}))
})





module.exports = router;





































































// // This file will define the API route handlers for dogs
// // We are going to parse request bodies so import koa-bodyparser
// const bodyParser = require('body-parser');  
// // Since we are handling dogs use a URI that begins with an appropriate path
// const router = Router({prefix: '/api/dogs'});
// const dogs = require('../models/dogs')


// router.get('/', getAll);  
// router.post('/', bodyParser(), addDog);  

// router.get('/:id([0-9]{1,})', getById);
// router.put('/:id([0-9]{1,})',  bodyParser(), updateDog);  
// // router.del('/:id([0-9]{1,})', removeDog);  

// // Now we define the handler functions used above.

// async function getAll(ctx){  
//    let dogs = await dogs.getAll(ctx);
//    ctx.body = dogs;  
//   }  
  
//   async function getById(ctx) {
//     const id = ctx.params.id;
//     const result = await dogs.getById(id);
//     if (result.length) {
//       const dog = result[0];
//       ctx.body = dog;
//       console.log(dog);
//     }
//   }


//   async function addDog(ctx) {
//     const body = ctx.request.body;
//     const result = await dogs.addDog(body);
//     if (result.affectedRows) {
//       const id = result.insertId;
//       ctx.status = 201;
//       ctx.body = {dogID: id, created: true, link: `${ctx.request.path}/${id}`};
//     }
//   }
  

//   async function updateDog(ctx) {
//     const id = ctx.params.id;
//     let result = await dogs.getById(id);  // check it exists

//     if (result.length) {
//       let dog = result[0];
//       // exclude fields that should not be updated
//       const {dogID, shelterID, ...body} = ctx.request.body;
//       // overwrite updatable fields with remaining body data
//       Object.assign(dog, body);
//       result = await dogs.updateDog(dog);
//       if (result.affectedRows) {
//         ctx.body = {dogID: id, updated: true, link: ctx.request.path};
//       }
//     }
//   }
  
//   // function updateArticle(cnx, next){  
//   //   //TODO: edit an article 
//   //   let id = cnx.params.id;  
//   //   let {title, fullText, date} = cnx.request.body;

//   //   // for(var i = 0; i <= dogs.length;  i++ ){
//   //   //   console.log(dogs[i])
//   //   // }
//   //   //console.log(dogs[id].title)
//   //   // let {title, fullText} = cnx.request.body;

//   //   // console.log(dogs[id-1].title = title, dogs[id-1].fullText = fullText, dogs[id-1].date = date)

//   //   if  ((id < dogs.length+1))
//   //   {
//   //     dogs[id-1].title = title
//   //     dogs[id-1].fullText = fullText
//   //     dogs[id-1].date = date
//   //     cnx.status = 201;
//   //   }
//   //   else{
//   //     cnx.status = 404; 
//   //   }

//   //   // if ((id < dogs.length+1) && (id > 0)) {
//   //   //   cnx.body = dogs[id-1];
//   //   // } else {
//   //   //   cnx.status = 404;
//   //   // }
//   //   // dogs.put(update);

//   //   // dogs[id[1]]
//   //   // dogs.push(newArticle);

    
//   //   //console.log(dogs[id].title=title , dogs[id].fullText=fullText)
     
//   // }  
  
//   // function removeDog(cnx, next){  
//   //   //TODO: delete an article  
//   //   let id = cnx.params.id;  

//   //   if  ((id < dogs.length+1))
//   //   {
//   //     dogs.pop(id);
//   //     cnx.status = 410;
//   //   }
//   //   else{
//   //     cnx.status = 404; 
//   //   }

//   // }  
  
//   // Finally, define the exported object when 'require'd from other scripts. 
//   module.exports = router;