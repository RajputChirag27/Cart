import { NextFunction } from "express";
import { AuthenticatedRequest } from "../interfaces/authentication.interface";
import { AuthenticatedResponse } from "../interfaces/authenticationResponse.interface";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config()
import User from "../models/user.model";
import Profile from "../models/profile.model";





// Middleware to authenticate the user
 function authenticateProfileToken (req : AuthenticatedRequest, res : AuthenticatedResponse , next : NextFunction) {
  // const authHeader = req.headers['authorization'];
  const token = req.cookies.token1;
  if (!token) {
    return res.status(401).send("Unauthorized: No token provided.");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY!, async (err : any, decoded : any) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).send("Forbidden: Invalid token.");
    }
    req.profile = decoded;
    const userId = await User.find({_id: req.profile.userId})
    const profileId = await Profile.find({_id : req.profile.profileId})
    if(userId && profileId){
      next();
    } else{
      res.send("User Not Found");
    }
  });
}



export default authenticateProfileToken;
