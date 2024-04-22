const User = require('../models/user.model')
const {start} = require('../db/connection')
const isAdmin = async(req,res,next) =>{
    const user = await User.findById(req.user.userId);
    if(user.role  !== 'admin'){
        res.send("Not Permitted because you are not an Admin")
    } else{
        next();
    }
}

module.exports = isAdmin;