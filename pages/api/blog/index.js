import connectDb from "../../../dbConfig/dbConfig";
import Blog from "../../../models/Blog";
import User from "../../../models/User";

// Blog Sent
connectDb();

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const user_temp = await User.find()
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
  if (req.method === "POST") {
    try {
      const reqBody = req.body;
      const { title, description, user, category } = reqBody;
      const blog = new Blog({
        title,
        description,
        user,
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
  }
};

// export default Blog;
