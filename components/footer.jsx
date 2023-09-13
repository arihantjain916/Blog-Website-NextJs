import Link from "next/link";
import {
  AiOutlineInstagram,
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineCopyrightCircle,
} from "react-icons/ai";

export const Footer = () => {
  return (
    <>
    <hr />
      <footer className="flex flex-col">
        <div className="flex flex-col px-5 py-10 text-gray-500 gap-y-8 font-Playfair lg:flex-row lg:justify-between lg:gap-10 ">
          <div className="w-full b1">
            <h1 className="mb-5 text-3xl text-black">Arihant Jain</h1>
            <h1 className="text-2xl text-black">Call Us</h1>
            <a className="text-2xl text-blue-500" href="tel:+919672670732">
              +919672670732
            </a>
            <p className="mt-5 mb-2 text-lg">
              Jaipur,Rajasthan
              <br />
              India, 302039
              <br />
            </p>
            <a className="text-lg" href="mailto:arihantj916@gmail.com">
              arihantj916@gmail.com
            </a>
          </div>
          <div className="flex flex-col w-full box lg:flex-row gap-y-8">
            <div className="w-full b2">
              <h2 className="mb-3 text-xl text-black lg:mb-5">About Us</h2>
              <ul>
                <li className="mb-2 lg:mb-4" li></li>
                <li className="mb-2 lg:mb-4">Terms Page</li>
                <li className="mb-2 lg:mb-4">
                  <Link href="/contact-us">
                  Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full b3">
              <h2 className="mb-3 text-xl text-black">Helpful Resources</h2>
              <ul>
                <li className="mb-2 lg:mb-4">
                  <Link href="/terms-of-use">Terms of Use</Link>
                </li>
                <li className="mb-2 lg:mb-4">Privacy Center</li>
                <li className="mb-2 lg:mb-4">Security Center</li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="bg-blue-500" />
        <div className="flex flex-col-reverse items-center justify-center px-10 py-5 gap-y-4 lg:flex-row lg:justify-between">
          <div className="">
            <p className="text-xl text-black">Copyright © 2023 Arihant Jain</p>
          </div>
          <div className="flex gap-5 icons">
            <div className="instagram">
              <AiOutlineInstagram size={40} />
            </div>
            <div className="linkedin">
              <AiOutlineLinkedin size={40} />
            </div>
            <div className="github">
              <AiOutlineGithub size={40} />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
