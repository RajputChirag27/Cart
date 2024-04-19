const mongoose = require('mongoose')
const { start, end } = require('../db/connection')

const validateEmail = (email) => {
    const regex = /^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/gm
    return regex.test(email)
}



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validateEmail, 'Please enter a valid email']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const User = new mongoose.model('User', userSchema)






module.exports = User;