const { start } = require("../../db/connection");
const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { getProfile } = require("../Profile/getProfile.controller");

dotenv.config();

// Function to encrypt password
const decrypt = async (plainPassword, hashedPassword) => {
  const isPasswordCorrect = bcrypt.compareSync(plainPassword, hashedPassword);
  return isPasswordCorrect;
};

const userControllerLogin = async (req, res, next) => {
  try {
    // await start();
    // console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    // console.log(email)
    // console.log(password)
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
    res.cookie('token', token, {maxAge: 9000000, httpOnly: true});
    // res.send({ token, message: "User logged in successfully." });
    res.redirect('/profile/protected/getProfile')
    // res.render('Profile/profile', getProfile);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal server error.");
  }
};

module.exports = userControllerLogin;
