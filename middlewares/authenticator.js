const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();



// Middleware to authenticate the user
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send("Unauthorized: No token provided.");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).send("Forbidden: Invalid token.");
    }
    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken;
