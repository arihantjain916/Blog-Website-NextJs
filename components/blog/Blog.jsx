"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../app/loading";

const Blog = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch("/api/blog");
        if (response.status === 200) {
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
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    const truncatedText = text.substring(0, maxLength).trim();
    return `${truncatedText}...`;
  };

  return (
    <main className="font-Nunito p-8">
      <Toaster />


      {loading ? (
        <Loading/>
      ) : (
        <div className="blog-grid grid lg:grid-cols-3 w-full gap-3 md:grid-cols-2">
          {blog.map((post) => (
            <div
              key={post.id}
              className="blog p-3 w-full border-2 rounded-lg bg-slate-200"
            >
              <div className="content">
                <div className="category flex gap-5 mb-2">
                  <div className="time">
                    <p>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="category">
                    <p>{post.category.toUpperCase()}</p>
                  </div>
                </div>
                <div className="title">
                  <h1 className="mb-2 text-2xl">
                     <Link href={`/blog/${post._id}`}>{post.title}</Link>
                  </h1>
                  <p>
                     <Link href={`/blog/${post._id}`}>{truncateText(post.description, 250)}</Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Blog;
