import connectDb from "../../../dbConfig/dbConfig";
import Blog from "../../../models/Blog";
import User from "../../../models/User";
import authMiddleware from "../../../helpers/authMiddleware";

// Blog Sent
connectDb();

export default async (req, res) => {
  if (req.method === "GET") {
    const { query } = req.query;
    if (query) {
      try {
        const user_temp = await User.find();
        const blogs = await Blog.findById(query)
          .sort({ date: -1 })
          .populate("user");

        return res.status(200).json({ blog: blogs });
      } catch (err) {
        return res.status(500).json({
          message: "Error...",
          success: false,
          error: err.message,
        });
      }
    } else {
      try {
        const user_temp = await User.find();
        const blogs = await Blog.find().sort({ date: -1 }).populate("user");
        return res.status(200).json({ blog: blogs });
      } catch (err) {
        return res.status(500).json({
          message: "Error...",
          success: false,
          error: err.message,
        });
      }
    }
  }
  if (req.method === "POST") {
    // Apply the authMiddleware only for POST requests
    return authMiddleware(async (req, res) => {
      try {
        const reqBody = req.body;
        const { title, description, category } = reqBody;
        const blog = new Blog({
          title,
          description,
          user: req.userid,
          category,
        });

        await blog.save();
        return res.status(201).json({
          message: "Blog created successfully",
          success: true,
        });
      } catch (err) {
        return res.status(500).json({
          message: "Error...",
          success: false,
          error: err.message,
        });
      }
    })(req, res);
  }
};
