"use server";

import connectDb from "../../../../dbConfig/dbConfig";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../../../../helpers/generateToken";
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    await connectDb();

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        error: "User Not Found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    // isPasswordMatch
    // if(password  user.password)
    if (!isPasswordMatch) {
      return res.status(400).json({
        error: "Invalid Credentials",
        success: false,
      });
    }
    const token = generateToken(user._id, user.isAdmin);
  
    return res.status(201).json({
      message: "Login Successful",
      success: true,
      token:token
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

// Error handling function
const handleServerError = (res, error) => {
  return res.status(500).json({
    message: "Internal Server Error",
    success: false,
    error: error.message,
  });
};

export default login;
