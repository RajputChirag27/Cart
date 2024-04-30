const express = require("express");
const router = express.Router();
import authenticateToken from "../middlewares/authenticator.middleware";
const {createProfile} = require("../controllers/Profile/createProfile.controller")
import { getProfile, getProfileByName } from "../controllers/Profile/getProfile.controller"
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../interfaces/authentication.interface";
import { AuthenticatedResponse } from "../interfaces/authenticationResponse.interface";

// Create Profile 
router.use(authenticateToken)

router.post('/createProfile', createProfile);


// Create Profile Test 

router.post('/createProfile/test', async (req: AuthenticatedRequest, res: AuthenticatedResponse) =>{
    try{
        await createProfile();
    } catch(error){
        console.error(error)
    }
});




// Get Profile


router.get('/getProfile', async (req: AuthenticatedRequest, res: Response) => {
    try {
        // Call the getProfile function passing req, res, and next
        const result = await getProfile(req, res, () => {});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Get Profile Test 

router.get('/getProfile/test', getProfile, (req: Request, res: Response) => {
    res.send('Hey there')
})


router.post('/getProfileByName', getProfileByName)



export default router