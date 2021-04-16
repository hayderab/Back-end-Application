
const Users = require('../models/users')


/**
 * Checking if the user has signup code to grant further permissions.
 * @param {userId} req getting user id.
 * @param {permission} res permission denied if user doesnot have sigup code
 * @param {next} next    allow uers to modify dogs if code matches
 */
function userRole(req, res, next ){
    Users.findById(req.user.id)
    .select("-password")
    .then(user =>{
        if (user.sigupcode === "600cem" ){
            // res.json(user.sigupcode)
            next();
        }
        else{
            // res.send("Not allowed");
            res.status(403).json({message:"Premission denied"})        }
    })
}
module.exports = userRole;

