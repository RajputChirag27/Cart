import mongoose, { Model } from "mongoose";



const validateEmail = (email : string) => {
  const regex = /^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/gm;
  return regex.test(email);
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validateEmail, "Please enter a valid email"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;
