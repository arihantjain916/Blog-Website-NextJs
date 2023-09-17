"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
export const Contactus = () => {
  const router = useRouter();
  const [message, setmessage] = useState({
    email: "",
    fullname: "",
    message: "",
  });
  const registerMessage = async (message) => {
    try {
      const response = await fetch("/api/contact-us/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (response.status === 201) {
        const data = await response.json();
        toast.success(data.message);
        // router.push("/");
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
        toast.error(errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const setDefaultValue = () => {
    setmessage({
      email: "",
      fullname: "",
      message: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerMessage(message);
    setDefaultValue();
  };
  return (
    <main>
      <Toaster />
      <div className="flex flex-col py-10 lg:p-2 lg:pt-10 lg:flex-row lg:justify-around">
        <div id="image">
          <img
            src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            alt=""
          />
        </div>
        <div
          id="contact-us"
          className="w-full p-10 lg:p-[2.3rem] border-2 lg:rounded-r-2xl border-black bg-white"
        >
          <h1 className="text-center text-[#00054B] text-4xl font-Playfair mb-8 lg:mb-12 ">
            Contact Us
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 lg:gap-10"
          >
            <input
              required
              className="border-b-2 border-[#00054B] pb-2 outline-none"
              type="text"
              placeholder="Full Name"
              value={message.fullname}
              onChange={(e) =>
                setmessage({ ...message, fullname: e.target.value })
              }
            />
            <input
              required
              className="border-b-2 border-[#00054B] pb-2 outline-none"
              type="email"
              placeholder="E-mail"
              value={message.email}
              onChange={(e) =>
                setmessage({ ...message, email: e.target.value })
              }
            />
            <input
              required
              className="border-b-2 border-[#00054B] pb-2 outline-none"
              type="text"
              placeholder="Message"
              value={message.message}
              onChange={(e) =>
                setmessage({ ...message, message: e.target.value })
              }
            />
            <button
              className="p-3 py-4 mt-3 font-Playfair text-xl bg-[#00054B] text-white rounded-full lg:mt-6"
              type="submit"
            >
              Contact Us
            </button>
          </form>
        </div>
      </div>
      <section id="contact" className="min-h-0 p-5 mt-10">
        <div>
          <h1 className="text-3xl text-center md:text-4xl">Get in Touch</h1>
          <hr className="w-24 h-1 mx-auto my-2 bg-green-500 border-0 rounded md:w-32 md:my-2" />
        </div>
        <div className="flex flex-col p-5 mt-0 space-y-10 text-center md:flex-row md:justify-around md:content-center">
          <div className="md:flex md:flex-col md:justify-center md:items-center mt-[40px]">
            <ion-icon className="text-3xl" name="location-sharp"></ion-icon>
            <h2 className="mt-2 mb-2 text-3xl">Address</h2>
            <p className="text-xl mb-2 text-[#717170]">Jaipur, Rajasthan</p>
            <p className="text-xl text-[#717170]">India</p>
          </div>
          <hr className="bg-gray-800 dark:bg-grey-800 h-0.5 md:hidden" />
          <div>
            <ion-icon className="text-3xl" name="call-sharp"></ion-icon>
            <h2 className="mt-2 mb-2 text-3xl">Contact Number</h2>
            <Link className="text-xl text-[#717170]" href="tel:+919672670732">
              +919672670732
            </Link>
          </div>
          <hr className="bg-gray-800 dark:bg-grey-800 h-0.5 md:hidden" />
          <div>
            <ion-icon className="text-3xl" name="mail-sharp"></ion-icon>
            <h2 className="mt-2 mb-2 text-3xl">Email Address</h2>
            <Link
              className="text-xl text-[#717170]"
              href="mailto:arihantj916@gmail.com"
            >
              arihantj916@gmail.com
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
