import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide an Username"],

    unique: [true, "Username is already taken"],
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],

    unique: [true, "Email is already taken"],
  },
  isAdmin: {
    type: Boolean,

    default: false,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
