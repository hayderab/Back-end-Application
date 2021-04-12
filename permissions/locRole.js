
const Users = require('../models/users')
const Dogs = require('../models/dogs')



// function doglocation(req){
//     Dogs.findById(req.params.id ).then(dogs =>{
//         return dogs.location 
//     })
// }

// checking if the user has signup code to grant further permissions.
function locRole(req, res, next ){
   Users.findById(req.user.id)
    .select("-password")
    .then(user =>{
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
