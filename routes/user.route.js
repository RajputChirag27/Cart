const express = require("express");
const router = express.Router();
const { start, end } = require("../db/connection");
const userControllerSignUp = require("../controllers/signup.controller");
const userControllerLogin = require("../controllers/login.controller");
const userControllerDelete = require("../controllers/userDelete.controller")
const authenticateToken = require("../middlewares/authenticator")

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// @login Route
router.post("/login", async (req, res) => {
  try {
    await start();
    console.log("Database Connected Succesfully");
    res.status = 200;
    res.send("Login Route");
  } catch (err) {
    console.log(err);
  }
});

// @Signup route

router.post("/signup", userControllerSignUp, async (req, res) => {
  try {
    console.log("Database Connected Succesfully");
    res.status = 200;
    res.send("SignUp Route");
  } catch (err) {
    console.log(err);
  }
});

// @route   GET api/profile

// @desc    Test route

//Login
router.post("/login/test", userControllerLogin, async (req, res) => {
  if (userControllerSignUp) {
    try {
      await start();
      console.log("Database Connected Succesfully");
      res.status = 200;
      res.send("SignUp Test Route");
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Please Enter Valid Data");
  }
});

// Sign Up

router.post("/signup/test", userControllerSignUp, async (req, res) => {
  try {
    await start();
    console.log("Database Connected Succesfully");
    res.status = 200;
    if (userControllerSignUp) {
      res.send("Welcome to the homePage");
    }
    res.send("SignUp Test Route");
  } catch (err) {
    console.log(err);
  }
});


// Delete User
router.delete("/delete", userControllerDelete)

router.delete("/delete/test", userControllerDelete, (req,res)=>{
  
});

// @access  Public

// Protected Route

router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});



module.exports = router;
