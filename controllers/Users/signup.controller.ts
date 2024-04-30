import { UserInterface } from '../../interfaces/user.interface';
import { Request, Response } from 'express';
import User from '../../models/user.model';
import bcrypt from 'bcrypt'


// Function to encrypt password
const encrypt = async (password: string) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
};

const userControllerSignUp = async (req: Request, res: Response, next: any): Promise<void> => {
    // await start();
    const { username, email, role, password } : UserInterface = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            res.status(400).send('User already exists');
            return;
        }

        // Hash the password
        const hashedPassword = await encrypt(password);

        // Create a new user instance with necessary fields
        const newUser = new User({
            username,
            email,
            role,
            password: hashedPassword // Store the hashed password
        });

        // Save the user to the database
        await newUser.save();
        // res.status(201).send('User created successfully');
        res.redirect('/index')
    } catch (error : any) {
        res.status(400).send(error.message);
    }
};

export default userControllerSignUp
