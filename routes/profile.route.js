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

router.get('/getProfile', async (req, res) => {
    try {
        // Call the getProfile function passing req, res, and next
        const result = await getProfile(req, res);
        console.log(result);
        
        // Render the profile.ejs template and pass the result
        res.render('Profile/profile', { profile: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// Get Profile Test 

router.get('/getProfile/test',getProfile, (req, res) => {
    res.send('Hey there')
})


router.post('/getProfileByName', getProfileByName)




module.exports = router