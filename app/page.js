import { LogoutButton } from "../components/user/logout";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/footer";
import Blog from "../components/blog/Blog";

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
