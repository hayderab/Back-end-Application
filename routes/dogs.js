
var express = require('express');
var router = express.Router();
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

const Dogs = require('../models/dogs')
const bodyParser = require("body-parser");
const { findById, findByIdAndUpdate, findByIdAndDelete } = require('../models/dogs');
var multer  = require('multer')

const auth = require("../strategies/auth_token.js")

const authRole = require("../permissions/role");
const locRole = require("../permissions/locRole");



/**
 * Storing image on local storage
 */
const storage = multer.diskStorage({
  // referece: code obtained from npm pakage doc..
  destination: function (req, file, cb) {
    cb(null, `./uploads/`)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
});
const upload = multer({ storage:storage})


///@route Get api/dogs/
//@desc User and employee
//@access public
router.get('/', async function (req, res) {
  const {page,limit, type, avilable, location, sort} = req.query;
  
  const avilabledb = Dogs.find({avilable:avilable});
  if(!location){
    avilabledb.limit(limit * 1).skip((page -1 )*limit).sort({"dateAdded":sort})   // and operator body finishes
    .then(dogs => res.json(dogs))
      .catch(err => res.status(404).json({message: "err"}))
  }
  else{
    await Dogs.find({
      $or:[{avilable:avilable,location:location}
         ,{avilable:avilable,location:location, type:type},
          {location:location}, {$or:[{location:location},{type:type}]}]   
    })
    .limit(limit * 1).skip((page -1 )*limit).sort({"dateAdded":sort})   // and operator body finishes
    .then(dogs => res.json(dogs))
    .catch(err => res.status(404).json({message: "err"}))
  }
});



router.get('/:id', auth, async function (req, res) {
  await Dogs.findById(req.params.id)
  .then(dogs => res.json(dogs))
  .catch(err => res.status(404).json({message: err}))
});


//@route Get api/dogs
//@desc Employee
//@access private
router.post('/', auth, authRole, upload.single('imageUrl'),(req, res) => {
//  firstname, lastName, email, sigupcode = req.body;
    var path = req.file.path;
    var path = path.replace("\\", "/");
    const {name, type, location,avilable, imageUrl} = req.body;
      const newdogs = new Dogs({
        name,
        type, 
        location,
        avilable,
        imageUrl:path
      });
      newdogs.save()
      .then(dogs => res.status(201).json(dogs))
      .catch(err => res.status(403).json({message: "error adding dogs"}))
})



router.put('/update/:id',auth, authRole,locRole,upload.single('imageUrl'), async function (req, res) {
        var path = req.file.path;
        var path = path.replace("\\", "/");
        // const dogs  = await Dogs.findOne().select("imageUrl")
        const prvImage  = await Dogs.findOne({_id:req.params.id}).select("imageUrl")
        if(path == undefined){
          path = prvImage.imageUrl
        }else{
          deleteFile(prvImage.imageUrl)
        }
        await Dogs.findByIdAndUpdate(req.params.id, 
            {
              name:     req.body.name, 
              type:     req.body.type, 
              location: req.body.location, 
              avilable: req.body.avilable,
              imageUrl: path

            },
            {
                useFindAndModify: false
            }
        )
        .then(res.send({ message: 'Dog updated!' }))
        .catch(err => res.status(404).json({ success: false }));
});


//@route DELETE api/dogs/delete/id
//@desc Delete dogs
//@access private
//----------------------------------
router.delete('/delete/:id',auth, authRole, function (req, res) {
  dogs.findByIdAndDelete(req.params.id)
  .then(res.status(404).json({message: "deleted"}))
 .catch(err => res.status(403).json({message: err}))
})




/**
 * Deleting already existing image un update..
 * @param {path} path get image path 
 */
function deleteFile(path){
  fs.unlink(path, (err) => {
    if (err) {
      // console.log("file not found")
      return
    }
    // console.log("file deleted")
    return
  })
}


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