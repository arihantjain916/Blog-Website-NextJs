import connectDb from "../../../dbConfig/dbConfig";
import Blog from "../../../models/Blog";
import User from "../../../models/User";
import authMiddleware from "../../../helpers/authMiddleware";

// Blog Sent
connectDb();

export default async (req, res) => {
  if (req.method === "GET") {
    const query = req.query;
    const { id, category, limit, search } = query;

    // console.log("From Backend: " + search)

    let querydata = {};
    const defaultLimit = 9;
    if (id) {
      querydata._id = id;
    } else if (category) {
      querydata.category = category;
    } else if (search) {
      querydata.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    try {
      const user_temp = await User.find();
      const blogs = await Blog.find(querydata)
        .sort({ date: -1 })
        .populate("user")
        .limit(limit || defaultLimit);

      const blogCount = await Blog.count();
      // console.log("blogs: " + blogs);
      return res.status(200).json({ blog: blogs, blogCount: blogCount });
    } catch (err) {
      return res.status(500).json({
        message: "Error...",
        success: false,
        error: err.message,
      });
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
