const Profile = require('../../models/profile.model');
const { start } = require('../../db/connection')
const jwt = require('jsonwebtoken')

const getProfile = async (req, res, next) => {
    console.log(req.user.userId)
    try {
        
        const profile = await Profile.find({ user_id: req.user.userId });
        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            })
        }

        res.status(200).json({
            profile: profile
        })


    } catch (err) {

    }
}

const getProfileByName = async (req, res, next) => {
    try {
   
        const profile = await Profile.findOne({ name: req.body.name });
        console.log(profile)
        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            })
        }

        const jwtPayload = {
            profileId: profile._id,
            userId: profile.user_id,
            profileName: profile.name
        };
        console.log(jwtPayload)


        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h', // Token expires in 1 hour
        });



        res.status(200).json({
            token,
            message: "Profile Connected Successfully",
        })

    } catch (err) {
        console.log(err)
    }
}

module.exports = { getProfile, getProfileByName };