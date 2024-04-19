const express  = require('express')
const router = express.Router();
const {start, end} = require('../db/connection')
const userControllerSignUp = require('../middlewares/signup')


router.use(express.json());
router.use(express.urlencoded({ extended: true }))

// @login Route
router.post('/login', async(req,res)=>{
    try {
        await start();
        console.log('Database Connected Succesfully')
        res.status = 200;
        res.send('Login Route')
    } catch(err){
        console.log(err);
    }
})


// @Signup route

router.post('/signup',userControllerSignUp ,async(req,res)=>{
    try {
        console.log('Database Connected Succesfully')
        res.status = 200;
        res.send('SignUp Route')
    } catch(err){
        console.log(err);
    }
})

// @route   GET api/profile

// @desc    Test route

//Login
router.post('/login/test', async(req,res)=>{
    if(userControllerSignUp){
        try {
            await start();
            console.log('Database Connected Succesfully')
            res.status = 200;
            res.send('SignUp Test Route')
        } catch(err){
            console.log(err);
        }
    } else{
        console.log("Please Enter Valid Data")
    }


})

// Sign Up


router.post('/signup/test',userControllerSignUp, async(req,res)=>{
    try {
        await start();
        console.log('Database Connected Succesfully')
        res.status = 200;
        if(userControllerSignUp){
            res.send('Welcome to the homePage')
        }
        res.send('SignUp Test Route')
    } catch(err){
        console.log(err);
    }
})




// @access  Public



module.exports = router;