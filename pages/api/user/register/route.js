import connectDb from "../../../../dbConfig/dbConfig";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  try {
    await connectDb();
    const reqBody = req.body;
    const { email, username, password } = reqBody;

    const user_check = await User.findOne({ $or: [{ email }, { username }] });
    if (user_check) {
      return res.status(400).json({
        error: "Email or username is already taken",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hash,
    });

    const savedUser = await user.save();
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user: savedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error...",
      success: false,
      error: error.message,
    });
  }
};

export default register;
