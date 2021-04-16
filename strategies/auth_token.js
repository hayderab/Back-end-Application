const jwt = require("jsonwebtoken");

/**
 * Access jwt token from cookies and varify that.
 * @param {cookies} req includes Jwt token
 * @param {message} res  status code 401, authorisation denied
 * @param {next} next continue if token varified.
 */
function auth(req, res, next){
   const token = req.cookies.token;    
    console.log(token);
   //  const token = req.header('x-auth-token');
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
        console.log("tokin decoding.....................")
        next();
     }catch(err){
        //bad request
        res.status(400).json({message: "Token not valid"})
     }
}
module.exports = auth;
