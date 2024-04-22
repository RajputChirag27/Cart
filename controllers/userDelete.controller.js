const User = require("../models/user.model");
const { start } = require("../db/connection");


const userControllerDelete = async (req, res, next) => {
    console.log(req.user);
    try {
        await start()
        const users = req.user
        console.log(users)
   
        // const user = await User.findOne({ _id: req.user.userId })

        // if (user) {
        //     const deletedUser = await User.deleteOne(user);
        //     res.send(
        //         {
        //             message: "Deleted User Successfully",
        //             result : deletedUser
        //         })
        // } else {
        //     res.send("User Not Exists")
        // }
    } catch (err) {
        console.log(err)
    }
}

module.exports = userControllerDelete;