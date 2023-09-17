import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide an title"],
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["education", "technology", "hostel", "collage"],
    required: [true, "Please provide a category"],
    default: "education",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
