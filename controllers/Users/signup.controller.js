const { start } = require('../../db/connection');
const User = require('../../models/user.model');
const bcrypt = require('bcrypt');

// Function to encrypt password
const encrypt = async (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
};

const userControllerSignUp = async (req, res, next) => {
    // await start();
    const { username, email, role, password } = req.body;
    
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).send('User already exists');
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
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = userControllerSignUp;
