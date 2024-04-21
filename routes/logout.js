const express = require("express");
const router = express.Router();
const { start, end } = require("../db/connection");
const authenticateToken = require("../middlewares/authenticator");
const {checkTokenRevocation, revokedTokens} = require("../middlewares/logout");



router.post("/logout", checkTokenRevocation,authenticateToken, (req, res) => {
    const token = req.headers.authorization; // Assuming token is sent in the Authorization header
  
    // Add token to revoked tokens
    if (token) {
      revokedTokens.add(token);
    }
  
    res.status(200).json({ message: "Token revoked successfully" });
  });
  


module.exports = router;