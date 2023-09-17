"use client"

import Blog from "../../components/blog/Blog";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/footer";
import { useSearchParams } from 'next/navigation';

const BlogPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  return (
    <>
      <Navbar />
      <main className="p-10"></main>
      <Blog  category={category} search={search} />
      <Footer/>
    </>
  );
};

export default BlogPage;
