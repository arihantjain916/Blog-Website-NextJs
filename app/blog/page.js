import Blog from "../../components/blog/Blog";
import { Navbar } from "../../components/Navbar";

const BlogPage = () => {
  return (
    <>
      <Navbar />
      <main className="p-10"></main>
      <Blog />
    </>
  );
};

export default BlogPage;
