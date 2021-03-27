const jwt = require("jsonwebtoken");

function auth(req, res, next){
    const token = req.header('x-auth-token');
    // checking the token...
    if (!token){
        // unauthorised 
        res.status(401).json({message:"No token, authorization denied"});
    }

     try {
        //verifying token
        const decode = jwt.verify(token, "thesecretkey"); 
        // add the user from payload. 
        req.user = decode; 
        next();
     }catch(err){
        //bad request
        res.status(400).json({message: "Token not valid"})
     }
    
}
module.exports = auth;
