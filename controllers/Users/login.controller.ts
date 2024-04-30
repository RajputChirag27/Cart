import { Request, Response } from 'express';
import User from '../../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();


// Function to encrypt password
const decrypt = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  const isPasswordCorrect = bcrypt.compareSync(plainPassword, hashedPassword);
  return isPasswordCorrect;
};

const userControllerLogin = async (req: Request, res: Response, next: any): Promise<void> => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      const message: string = "User does not exist. Please sign up.";
      res.json({ "message": message });
      return;
    }

    // Verify password
    const isPasswordValid = await decrypt(password, user.password);
    if (!isPasswordValid) {
      const message = "Invalid Password";
      res.json({ "message": message });
      return;
    }

    // Construct JWT payload
    const jwtPayload = {
      userId: user._id,
      email: user.email,
    };

    // Generate JWT token
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY!, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Send the token and success message
    res.cookie('token', token, { maxAge: 9000000, httpOnly: true });
    res.redirect('/profile/protected/getProfile')
    // res.redirect('/profile/protected/getProfile');
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal server error.");
  }
};

export default userControllerLogin;
