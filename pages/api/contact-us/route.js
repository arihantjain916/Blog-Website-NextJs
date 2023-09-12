"use server";

import connectDb from "../../../dbConfig/dbConfig";
import Contact from "../../../models/Contact-Us";

const login = async (req, res) => {
  try {
    const { email, fullname, message } = req.body;

    await connectDb();

    const contact = new Contact({
      fullname,
      email,
      message,
    });

    await contact.save();
    return res.status(201).json({
      message: "Message Register Successfully",
      success: true,
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
