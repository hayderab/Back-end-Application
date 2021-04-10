
const Users = require('../models/users')
const Dogs = require('../models/dogs')



// function doglocation(req){
//     Dogs.findById(req.params.id ).then(dogs =>{
//         return dogs.location 
//     })
// }

// checking if the user has signup code to grant further permissions.
function locRole(req, res, next ){
    

//    Dogs.findById(req.params.id)
//     .select("location")
//     .then(dogs =>{
//         // locationA = dogs.location
//        console.log(dogs)
//     })
//     // if (Users.location == req.body.location ){
//     //     console.log("goto next page");
      
//     //   }
//     // console.log(req.body.location )


   Users.findById(req.user.id)
    .select("-password")
    .then(user =>{
        // console.log(user.location)
        // locationB = user.location
        Dogs.findById(req.params.id).then(dogs =>{

            if(dogs.location == user.location){
                next(); 
            }else{
                res.status(403).json({message:"Premission denied"})      
            }
        })
       

     
    })

   
}

module.exports = locRole;
