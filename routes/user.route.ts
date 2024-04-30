import express, { Request, Response } from "express";
import start from "../db/connection";
import userControllerSignUp from "../controllers/Users/signup.controller";
import userControllerLogin from "../controllers/Users/login.controller";
import authenticateToken from "../middlewares/authenticator.middleware";
import { getProfile, getProfileByName } from "../controllers/Profile/getProfile.controller";
import { AuthenticatedRequest } from "../interfaces/authentication.interface";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// @login Route
// router.post("/login",(req, res)=>{
//   console.log(req.body);
//   res.send(req.body);
// });

router.route('/profile').post(userControllerLogin)
router.route('/profile').get(getProfile)
router.post("/profile", userControllerLogin)
// @Signup route

router.post("/signup", userControllerSignUp, async (req: Request, res: Response) => {
  try {
    await start();
    console.log("Database Connected Successfully");
    res.send("SignUp Route");
  } catch (err) {
    console.log(err);
  }
});

// @route   GET api/profile
// @desc    Test route
//Login
router.post("/login/test", userControllerLogin, async (req: Request, res: Response) => {

  try {
    await start();
    console.log("Database Connected Successfully");
    res.send("SignUp Test Route");
  } catch (err) {
    console.log(err);
    console.log("Please Enter Valid Data");
  }
});

// Sign Up
router.post("/signup/test", userControllerSignUp, async (req: Request, res: Response) => {
  try {
    await start();
    console.log("Database Connected Successfully");
    res.send("Welcome to the homePage");
  } catch (err) {
    console.log(err);
  }
});

// Delete User
// router.delete("/delete", userControllerDelete);

// router.delete("/delete/test", userControllerDelete, (req: Request, res: Response) => {
//   // Handler for delete/test route
// });

// @access  Public

//

export default router
