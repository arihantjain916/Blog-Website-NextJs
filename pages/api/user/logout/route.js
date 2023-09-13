"use server";

const logout = async (req, res) => {
  try {
    res.setHeader(
      "Set-Cookie",
      `JWT_AUTH_TOKEN=""; HttpOnly; Max-Age=0; Path=/;`
    );
    
    return res.status(201).json({
      message: "Logout Successful",
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

export default logout;
