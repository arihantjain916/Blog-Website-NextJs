"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../app/loading";
import Link from "next/link";

const Blog = ({category,search}) => {
  const categoryParams = category || ""
  const SearchParams = search || ""
  // console.log(SearchParams)
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(9);
  const [maxBlog, setMaxBlog] = useState(false);
  const [count, setBlogCount] = useState(0);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blog?limit=${limit}&category=${categoryParams}&search=${SearchParams}`);
      if (response.status === 200) {
        const data = await response.json();
        setBlog(data.blog);
        setBlogCount(data.blogCount);

        // Determine whether to show the "Read More" button
        setMaxBlog(data.blogCount <= limit);
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

  const handleLimit = () => {
    setLimit((prevLimit) => prevLimit + 9);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    const truncatedText = text.substring(0, maxLength).trim();
    return `${truncatedText}...`;
  };

  const postLink = (postId) => `/blog/${postId}`;

  useEffect(() => {
    fetchBlog();
    const interval = setInterval(fetchBlog, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [limit,category,search]);

  return (
    <main className="p-8 font-Nunito">
      <Toaster />

      {loading ? (
        <Loading />
      ) : (
        <div className="grid w-full gap-3 blog-grid lg:grid-cols-3 md:grid-cols-2">
          {blog.map((post) => (
            <div
              key={post.id}
              className="w-full p-3 border-2 rounded-lg blog bg-slate-200"
            >
              <div className="content">
                <div className="flex gap-5 mb-2 category">
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
                    <p className="text-blue-800">
                      <Link href={`/blog?category=${post.category}`}>
                      {post.category.toUpperCase()}</Link>
                    </p>
                  </div>
                </div>
                <div className="title">
                  <h1 className="mb-2 text-2xl">
                    <Link href={postLink(post._id)}>{post.title}</Link>
                  </h1>
                  <p>
                    <Link href={postLink(post._id)}>
                      {truncateText(post.description, 250)}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
     {blog.length > 0 && count > limit && (
  <div className="mx-auto mt-5 text-center">
    <div className="w-full h-[2px] bg-black"></div>
    <button onClick={handleLimit}>Read More</button>
    <div className="w-full h-[3px] bg-black"></div>
  </div>
)}
    </main>
  );
};

export default Blog;
