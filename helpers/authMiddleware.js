import User from "../models/User"
import jwt from "jsonwebtoken"

const authMiddleware = (handler) => async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res
          .status(401)
          .json({ message: "Not authorized, invalid token" });
      }
      else{
        req.user = user;
        req.userid = decoded.id;
        if (user.type === "isAdmin") {
            req.isAdmin = true;
          }
      }
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  return handler(req, res);
};

export default authMiddleware;
