const { start } = require('../db/connection');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Function to encrypt password
const decrypt = async (password) => {
    const isPasswordCorrect = bcrypt.compareSync(plainPassword, hashedPassword);
    return isPasswordCorrect;
};

const userControllerLogin = async (req, res, next) => {
    await start();
    const { username, email, role, password } = req.body;
    
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Hash the password
        const hashedPassword = await decrypt(password,dbPassword);

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
        res.redirect('/users/login')
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = userControllerLogin;
