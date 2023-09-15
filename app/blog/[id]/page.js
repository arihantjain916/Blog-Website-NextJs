import BlogRead from "../../../components/blog/BlogRead";

const BlogPost = ({params}) => {

  return (
    <BlogRead id={params.id} />
  )
};

export default BlogPost;
