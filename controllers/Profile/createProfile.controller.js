const Profile = require('../../models/profile.model');
const { start } = require('../../db/connection')
const User = require('../../models/user.model')
const jwt = require('jsonwebtoken')

const createProfile = async (req, res, next) => {
    // console.log(req.user.userId)
    // console.log(req.body)
    try {
        const newProfile = new Profile({
            user_id: req.user.userId,
            name: req.body.name,
        })
        const result = await newProfile.save();
        // console.log(result._id.toString())
        const user = await User.findById(req.user.userId);
        user.profiles.push(result._id.toString());
        await user.save();
        res.send({newProfile, token});
    } catch (err) {
        console.log(err)
        res.send(err)
    }

}

module.exports = createProfile