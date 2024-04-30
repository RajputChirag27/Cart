import Profile from "../../models/profile.model";
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { ProfileInterface } from "../../interfaces/profile.interface";
import { AuthenticatedRequest } from "../../interfaces/authentication.interface";
import dotenv from 'dotenv';
dotenv.config();

const getProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const profiles: ProfileInterface | null = await Profile.findOne({ user_id: req.user.userId });
    if (!profiles) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }
    console.log(profiles)
    res.render('Profile/profile',  {profile : [profiles]});
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getProfileByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const profile = await Profile.findById(req.body.profileId);
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }
    
    const jwtPayload = {
      profileId: profile._id,
      userId: profile.user_id,
      profileName: profile.name,
    };
    const secretKey: string | undefined = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      console.error("JWT secret key is not defined.");
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    const token = jwt.sign(jwtPayload, secretKey, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.cookie('token1', token, { maxAge: 3600000, httpOnly: true }); // Setting maxAge in milliseconds (1 hour)
    res.redirect('/products/getProducts');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getProfile, getProfileByName };
