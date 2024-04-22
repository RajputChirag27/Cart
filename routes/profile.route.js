const express = require("express");
const router = express.Router();
const { start, end } = require("../db/connection");
const authenticateToken = require("../middlewares/authenticator.middleware");
const createProfile = require("../controllers/Profile/createProfile.controller")
const {getProfile, getProfileByName} = require("../controllers/Profile/getProfile.controller")


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

router.get('/getProfile/test',getProfile, (req, res) => {
    res.send('Hey there')
})


router.post('/getProfileByName', getProfileByName)




module.exports = router