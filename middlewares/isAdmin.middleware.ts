import { NextFunction } from "express";
import { AuthenticatedRequest } from "../interfaces/authentication.interface";
import { AuthenticatedResponse } from "../interfaces/authenticationResponse.interface";
import User from '../models/user.model';

const isAdmin = async (req: AuthenticatedRequest, res: AuthenticatedResponse, next: NextFunction) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user || user.role !== 'admin') {
            res.status(403).send("Not Permitted because you are not an Admin");
        } else {
            next();
        }
    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        res.status(500).send("Internal Server Error");
    }
}

export default isAdmin;
