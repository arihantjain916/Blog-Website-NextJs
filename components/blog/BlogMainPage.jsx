"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Blog() {
  const [blog, setblog] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch("/api/blog");
      if (response.status === 200) {
        const data = await response.json();
        setblog(data.blog);
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
        toast.error(errorData.error);
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
  const setBlog = blog.slice(0, 3);
  return (
    <main className="p-10 font-Nunito">
      <Toaster />
      <div className="mb-5">
        <h1 className="mb-2 text-3xl font-bold font-Nunito">From the Blog</h1>
        <p>Learn how to grow your buisness with our expert advice.</p>
      </div>
      <hr />
      {/* Blog grid start */}
      <div className="grid gap-5 gap-y-9 lg:grid-cols-3">
        {/* blog start */}
        {setBlog.map((post) => {
          const truncatedDescription = truncateText(`${post.description}`, 250);
          const postDate = new Date(`${post.date}`);
          const formattedDate = postDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          return (
            <div className="blog" key={setBlog._id}>
              <div
                className="flex items-center gap-3 mt-5 mb-2 time and category"
                key={setBlog._id}
              >
                <div className="text-gray-400 time" key={setBlog._id}>
                  <p>{formattedDate}</p>
                </div>
                <div className="px-2 text-gray-900 category" key={setBlog._id}>
                  <p>{`${post.category}`.toUpperCase()}</p>
                </div>
              </div>
              <div className="flex flex-col w-full gap-y-5">
                <h2
                  className="text-xl font-semibold text-[#363C49]"
                  key={setBlog._id}
                >
                  <Link href={`/blog/${post._id}`}>{post.title}</Link>
                </h2>
                <p className="text-[#4B5563]" key={setBlog._id}>
                  <Link href={`/blog/${post._id}`}>{truncatedDescription}</Link>
                </p>
                <div className="flex gap-5 mt-3 image">
                  <img
                    className="border-2 rounded-full h-14 w-14"
                    src="https://images.unsplash.com/photo-1530000719555-94fb8ce95783?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                    alt="image"
                  />
                  <div className="name" key={setBlog._id}>
                    <p>{post.user.username}</p>
                    <p className="text-[#4B5563]">Student</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* <!-- End bg1 --> */}
      </div>
      {/* <!-- End grid --> */}
    </main>
  );
}
