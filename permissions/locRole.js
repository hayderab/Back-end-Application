
const Users = require('../models/users')
const Dogs = require('../models/dogs')

/**
 * allowing location based access 
 * @param {uId} req getting user id
 * @param {res} res permission denied
 * @param {next} next  allow uses to modify dogs if location matches.
 */
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
