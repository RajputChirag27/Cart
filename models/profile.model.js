const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name : {
        type : String,
        required : true,
        default :  "Profile 1",
        unique : true
    },
    carts : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Cart"
    }
}, { timestamps: true });


const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;