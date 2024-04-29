const Profile = require("../../models/profile.model");
const { start } = require("../../db/connection");
const jwt = require("jsonwebtoken");

const getProfile = async (req, res, next) => {
  // console.log(req.user.userId);
  try {
    const profile = await Profile.find({ user_id: req.user.userId });
    console.log(profile)
    // if (!profile) {
    //   return res.status(404).json({
    //     message: "Profile not found",
    //   });
    // }

    // res.status(200).json({
    //   profile: profile,
    // });
    return profile;
  } catch (err) {}
};

const getProfileByName = async (req, res, next) => {
  try {
    console.log(req.body.profileId)
    const profile = await Profile.findOne({ _id : req.body.profileId });
    // console.log(profile)
    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    const jwtPayload = {
      profileId: profile._id,
      userId: profile.user_id,
      profileName: profile.name,
    };
    console.log(jwtPayload);

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h", // Token expires in 1 hour
    });
    res.cookie('token1', token, {maxAge: 9000000, httpOnly: true});
    res.redirect('/products/getProducts')
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getProfile, getProfileByName };
