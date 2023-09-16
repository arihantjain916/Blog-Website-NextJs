"use client"

import Blog from "../../components/blog/Blog";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/footer";
import { useSearchParams } from 'next/navigation';

const BlogPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return (
    <>
      <Navbar />
      <main className="p-10"></main>
      <Blog  category={category} />
      <Footer/>
    </>
  );
};

export default BlogPage;
