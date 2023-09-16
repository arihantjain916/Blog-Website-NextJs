import connectDb from "../../../dbConfig/dbConfig";
import Blog from "../../../models/Blog";
import User from "../../../models/User";

const Search = async (req, res) => {
  try {
    connectDb();
    const { search } = req.query;

    const searchBlogs = await Blog.find({
      $or: [{ title: { $regex: search } }, { description: { $regex: search } }],
    });

    console.log(searchBlogs)
    return res.status(200).json({
      blogs: searchBlogs,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error...",
      success: false,
      error: err.message,
    });
  }
};

export default Search;
