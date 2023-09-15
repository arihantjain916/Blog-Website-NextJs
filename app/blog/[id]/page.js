import BlogRead from "../../../components/blog/BlogRead";
import { Navbar } from "../../../components/Navbar";

const BlogPost = ({ params }) => {
  return (
    <>
      <Navbar />
      <main className="p-10"></main>
      <BlogRead id={params.id} />
    </>
  );
};

export default BlogPost;
