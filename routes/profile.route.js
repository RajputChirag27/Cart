const express = require("express");
const router = express.Router();
const { start, end } = require("../db/connection");
const authenticateToken = require("../middlewares/authenticator");
const createProfile = require("../controllers/Profile/createProfile.controller")


// Create Profile 
router.use(authenticateToken)

router.post('/createProfile', createProfile);


// Create Profile Test 

router.post('/createProfile/test', createProfile);




// Get Profile

router.get('/getProfile', (req, res) => {
    const { userId } = req.body;
    console.log(userId)
})


// Get Profile Test 

router.get('/getProfile/test', (req, res) => {
    res.send('Hey there')
})




module.exports = router