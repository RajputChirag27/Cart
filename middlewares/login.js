const { start } = require("../db/connection");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

// Function to encrypt password
const decrypt = async (plainPassword, hashedPassword) => {
  const isPasswordCorrect = bcrypt.compareSync(plainPassword, hashedPassword);
  return isPasswordCorrect;
};

const userControllerLogin = async (req, res, next) => {
  try {
    await start();
    const email = req.body.email;
    const password = req.body.password;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User does not exist. Please sign up.");
    }

    // Verify password
    const isPasswordValid = await decrypt(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password.");
    }

    // Construct JWT payload
    const jwtPayload = {
      userId: user._id,
      email: user.email,
    };

    // Generate JWT token
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Send the token and success message
    res.send({ token, message: "User logged in successfully." });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal server error.");
  }
};

module.exports = userControllerLogin;
