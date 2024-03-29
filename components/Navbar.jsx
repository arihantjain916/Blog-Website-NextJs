"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { LogoutButton } from "./user/logout";
import { SearchBox } from "./SearchBox";

export const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  // <button className="px-8 py-3 mr-3 text-white bg-blue-500 border-2 rounded-full outline-none">
  //         <Link href="/user/login">Login</Link>
  //         </button>
  function NavOpen() {
    setOpen(!isOpen);
  }
  return (
    <>
      <nav className="w-full h-20 bg-white shadow-xl">
        <div className="flex items-center justify-between w-full h-full px-4 2xl:px-16">
          <div>
            <Link href="/" className="font-bold">
              <h1 className="text-2xl font-bold underline">Arihant Jain</h1>
            </Link>
          </div>
          <div className="hidden sm:flex">
            <ul className="hidden sm:flex">
              <li className="ml-10 text-base hover:border-b">
                <Link href="/blog">Blog</Link>
              </li>
              <li className="ml-10 text-base hover:border-b">
                <Link href="/about-us">About-Me</Link>
              </li>
              <li className="ml-10 text-base hover:border-b">
                <Link href="/contact-us">Contact-Me</Link>
              </li>
            </ul>
          </div>
          <div className="hidden lg:flex">
            <div>
              <SearchBox />
            </div>

            <div className="mt-9">
              <LogoutButton />
            </div>
          </div>

          <div className="lg:hidden md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              className="text-2xl cursor-pointer select-none"
              onClick={NavOpen}
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </div>
        </div>
        <div
          className={
            isOpen
              ? "fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-[#ecf0f3] p-10 ease-in-out duration-300"
              : "fixed left-[-100%] top-0 p-10 ease-in-out duration-300"
          }
        >
          <div className="flex items-center justify-end w-full">
            <div>
              <AiOutlineClose
                onClick={NavOpen}
                className="text-2xl cursor-pointer"
              />
            </div>
          </div>
          <div className="flex-col w-full py-4">
            <ul>
              <li
                onClick={() => setOpen(false)}
                className="py-4 cursor-pointer"
              >
                <Link href="/blog">Blog</Link>
              </li>
              <li
                onClick={() => setOpen(false)}
                className="py-4 cursor-pointer"
              >
                <Link href="/about-me">About-Me</Link>
              </li>
              <li
                onClick={() => setOpen(false)}
                className="py-4 cursor-pointer"
              >
                <Link href="/contact-us">Contact-Me</Link>
              </li>
            </ul>
          </div>
          <LogoutButton />
        </div>
      </nav>
    </>
  );
};
