import Profile from '../../models/profile.model';
import User from '../../models/user.model';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from "../../interfaces/authentication.interface";
import { AuthenticatedResponse } from '../../interfaces/authenticationResponse.interface';
import { ProfileInterface } from '../../interfaces/profile.interface';
import mongoose, { Document } from 'mongoose';

const createProfile = async (req: AuthenticatedRequest, res: AuthenticatedResponse, next: NextFunction): Promise<void> => {
    try {
        console.log(req.user)
        const newProfile = new Profile({
            user_id: req.user.userId,
            name: req.body.name,
        });
        const result = await newProfile.save();
        console.log(req.user)
        const user = await User.findById(req.user.userId);
        if (user) {
            const resultId = result._id as mongoose.Types.ObjectId; 
            user.profiles.push(resultId);
            await user.save();
        }
        res.redirect('/profile/protected/getProfile');
    } catch (err) {
        console.log(err);
        res.send('User Exists');
    }
};

export {createProfile};
