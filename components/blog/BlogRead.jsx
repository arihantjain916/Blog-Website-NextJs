"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../app/loading";

const BlogRead = ({ id }) => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog?id=${id}`);

        if (response.ok) {
          const data = await response.json();
          setBlog(data.blog);
        } else {
          const errorData = await response.json();
          console.error(errorData.error);
          toast.error(errorData.error);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching the blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const renderBlogItems = () => {
    if (loading) {
      return <Loading />;
    }

    if (blog.length === 0) {
      return <p>No blog posts found.</p>;
    }

    return blog.map((blogItem) => (
      <>
        <Toaster />
        <div key={blogItem._id} className="p-10">
          <div className="flex justify-around gap-5 category-time">
            <div className="time">
              <p>
                {new Date(blogItem.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="px-3 text-white bg-blue-500 category ">
              <p>{blogItem.category?.toUpperCase()}</p>
            </div>
          </div>
          <div className="content">
            <div className="mt-3 mb-5 text-3xl font-semibold text-center title lg:mt-10 lg:mb-9">
              <h1>
                {blogItem.title}
                <p className="mt-2 text-base">By: {blogItem.user.username}</p>
              </h1>
            </div>
            <div className="text-center content">
              <p>{blogItem.description}</p>
            </div>
          </div>
        </div>
      </>
    ));
  };
  return renderBlogItems();
};

export default BlogRead;
