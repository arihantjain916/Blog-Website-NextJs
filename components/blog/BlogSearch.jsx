"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../app/loading";
import Link from "next/link";

const Blog = ({ blogData }) => {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    const truncatedText = text.substring(0, maxLength).trim();
    return `${truncatedText}...`;
  };

  const postLink = (postId) => `/blog/${postId}`;

  return (
    <main className="p-8 font-Nunito">
      <Toaster />

      <div className="grid w-full gap-3 blog-grid lg:grid-cols-3 md:grid-cols-2">
        {blogData.map((post) => (
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
                      {post.category.toUpperCase()}
                    </Link>
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
    </main>
  );
};

export default Blog;
