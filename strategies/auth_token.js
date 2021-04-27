const jwt = require("jsonwebtoken");

/**
 * Access jwt token from cookies and varify that.
 * @param {Object} req includes Jwt token
 * @param {Object} res  status code 401, authorisation denied
 * @param {next} next continue if token varified.
 */
function auth(req, res, next){
   const token = req.cookies.token;    
    if (!token){
        // unauthorised 
        res.status(401).json({message:"No token, authorization denied"});
    }
     try {
        //verifying token
        const decode = jwt.verify(token, "thesecretkey"); 
        // add the user from payload. 
        req.user = decode; 
      //   console.log("tokin decoding.....................")
        next();
     }catch(err){
        //bad request
        res.status(400).json({message: "Token not valid"})
     }
}
module.exports = auth;
