import BlogRead from "../../../components/blog/BlogRead";
import { Navbar } from "../../../components/Navbar";

const BlogPost = ({ params }) => {
  return (
    <>
      <Navbar />
      <BlogRead id={params.id} />
    </>
  );
};

export default BlogPost;
