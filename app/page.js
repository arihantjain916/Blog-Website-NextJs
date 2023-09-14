import { Navbar } from "../components/Navbar";
import { Footer } from "../components/footer";
import Blog from "../components/blog/BlogMainPage";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="p-10"></main>
      <Blog />
      <Footer />
    </>
  );
}
