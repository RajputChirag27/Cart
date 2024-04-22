const Profile = require('../../models/profile.model');
const {start} = require('../../db/connection')

const createProfile = async (req, res, next) => {
    // console.log(req.user.userId)
    // console.log(req.body)
    try{
        await start();
        const newProfile = new Profile({
            user_id: req.user.userId,
            name: req.body.name,
        })
       const result = await newProfile.save();
        res.send(newProfile);
    } catch(err){
        console.log(err)
    }

}

module.exports = createProfile