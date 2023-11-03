const jwt = require("jsonwebtoken");
const config = require("config");

//middleware function has excess to the 'req' & 'res', 'next' is callback we need to run, to move onto the next piece
module.exports = function (req, res, next) {

  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if(!token) {
    return res.status(401).json({msg: 'No token, authorization denied'})
  }

  // Verify token
  try{
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  }catch(err){
    res.status(401).json({msg: 'Token is not valid'});
  }
};
