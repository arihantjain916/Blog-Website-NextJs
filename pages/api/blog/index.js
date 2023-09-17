import connectDb from "../../../dbConfig/dbConfig";
import Blog from "../../../models/Blog";
import User from "../../../models/User";
import authMiddleware from "../../../helpers/authMiddleware";

// Blog Sent
connectDb();

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const { id, category, limit = 9, search } = req.query;

      let queryData = {};
      if (id) {
        queryData._id = id;
      } else if (category) {
        queryData.category = category;
      } else if (search) {
        queryData.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }

      const blogsQuery = Blog.find(queryData)
        .sort({ date: -1 })
        .populate("user")
        .limit(+limit);

      const [blogs, blogCount] = await Promise.all([
        blogsQuery.exec(),
        Blog.countDocuments(queryData),
      ]);

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
        const { title, description, category } = req.body;
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
