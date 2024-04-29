const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const Profile = require('../models/profile.model')
dotenv.config();



// Middleware to authenticate the user
 function authenticateProfileToken (req, res, next) {
  // const authHeader = req.headers['authorization'];
  const token = req.cookies.token1;
  if (!token) {
    return res.status(401).send("Unauthorized: No token provided.");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).send("Forbidden: Invalid token.");
    }
    req.profile = decoded;
    const userId = await User.find({_id: req.profile.userId})
    const profileId = await Profile.find({_id : req.profile.profileId})
    if(userId && profileId){
      next();
    } else{
      res.send("User Not Found");
    }
  });
}



module.exports = authenticateProfileToken;
