"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../app/loading";

const BlogRead = ({ id }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog?query=${id}`);

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

  return (
    <main className="font-Nunito p-8">
      <Toaster />

      {loading ? (
        <Loading />
      ) : (
        blog && (
          <div class="p-10">
            <div class="category-time flex gap-5 justify-around">
              <div class="time">
                <p>
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div class="category text-white px-3 bg-blue-500 ">
                {" "}
                <p>{blog.category.toUpperCase()}</p>
              </div>
            </div>
            <div class="content">
              <div class="title text-center text-3xl font-semibold mb-5 mt-3 lg:mt-10 lg:mb-9">
                <h1>
                  <Link href={`/blog/${blog._id}`}>{blog.title}</Link>
                </h1>
              </div>
              <div class="content text-center">
                <p>
                  <Link href={`/blog/${blog._id}`}>{blog.description}</Link>
                </p>
              </div>
            </div>
          </div>
        )
      )}
    </main>
  );
};

export default BlogRead;
