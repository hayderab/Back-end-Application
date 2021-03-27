
const Users = require('../models/users')


// checking if the user has signup code to grant further permissions.
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

