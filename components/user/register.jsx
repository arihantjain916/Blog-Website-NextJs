"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export const Register = () => {
  const router = useRouter();

  const [user, setuser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const registerUser = async (userData) => {
    try {
      // const hash = await bcrypt.hash(userData.password, 10);
      // console.log(userData.password);
      // const bodyData = {
      //   username: userData.username,
      //   email: userData.email,
      //   password: hash
      // }
      const response = await fetch("/api/user/register/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 201) {
        const data = await response.json();
        toast.success(data.message);
        router.push("/user/login");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await registerUser(user);
    setLoading(false);
  };

  return (
    <>
      <Toaster />

      <main className="lg:flex lg:justify-around lg:p-5 lg:overflow-hidden">
        <div className="content">
          {/* <!-- heading start from here --> */}
          <div className="p-3 pt-11">
            <h1 className="mb-3 text-3xl text-center">Create an account</h1>
            <p className="text-base text-center text-gray-500">
              Simplify your shopping and save your time with Arihant's App. Get
              started for free.
            </p>
          </div>

          {/* <!-- Form begin here --> */}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 p-3 mt-5"
          >
            <input
              required
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setuser({ ...user, username: e.target.value })}
              className="p-3 pl-5 border-2 border-gray-300 outline-none focus:border-black rounded-3xl"
            />
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setuser({ ...user, email: e.target.value })}
              className="p-3 pl-5 border-2 border-gray-300 outline-none focus:border-black rounded-3xl"
            />
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setuser({ ...user, password: e.target.value })}
              className="p-3 pl-5 border-2 border-gray-300 outline-none focus:border-black rounded-3xl"
            />
            <p className="ml-3 -mt-5">Must be at least 8 characters</p>

            {loading ? (
              <button
                disabled
                type="submit"
                className="flex justify-center gap-1 p-3 mt-3 mb-5 text-white bg-black rounded-3xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                  width="20"
                  className="animate-spin fill-[#ffffff] mt-1"
                >
                  <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                </svg>
                Create Account
              </button>
            ) : (
              <button
                type="submit"
                className="flex justify-center gap-1 p-3 mt-3 mb-5 text-white bg-black rounded-3xl"
              >
                Create account
              </button>
            )}
          </form>

          {/* <!-- Social login here --> */}

          <div className="relative pl-5 mb-6 text-center">
            <div className="absolute top-1/2 w-1/3 h-0.5 bg-gray-300"></div>
            <p className="relative z-10 inline-block px-2 bg-white">
              Or continue with
            </p>
            <div className="absolute right-[1rem] top-1/2 w-1/3 h-0.5 bg-gray-300"></div>
          </div>
          <div className="flex justify-around mt-2 icons">
            <div className="p-5 bg-black rounded-full google">
              <Link href="/user/login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path
                    d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"
                    fill="rgba(255,255,255,1)"
                  ></path>
                </svg>
              </Link>
            </div>
            <div className="p-5 bg-black rounded-full">
              <Link href="/user/login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path
                    d="M16.9197 4.5C15.0689 4.5 13.622 5.89404 12.3123 7.6649C10.5124 5.37323 9.00722 4.5 7.20593 4.5C3.53352 4.5 0.719727 9.27931 0.719727 14.3379C0.719727 17.5034 2.25116 19.5 4.81628 19.5C6.66249 19.5 7.99028 18.6296 10.3508 14.5034C10.3508 14.5034 11.3347 12.7658 12.0116 11.5689C12.2488 11.9518 12.4981 12.3639 12.7611 12.8069L13.868 14.669C16.0242 18.2772 17.2256 19.5 19.4025 19.5C21.9014 19.5 23.2921 17.4761 23.2921 14.2448C23.2921 8.94828 20.4149 4.5 16.9197 4.5ZM8.55076 13.3862C6.63697 16.3862 5.9749 17.0586 4.90938 17.0586C3.81283 17.0586 3.16111 16.0959 3.16111 14.3793C3.16111 10.7069 4.99214 6.95172 7.1749 6.95172C8.35692 6.95172 9.34471 7.63438 10.8577 9.80042C9.42105 12.0041 8.55076 13.3862 8.55076 13.3862ZM15.7737 13.0085L14.4502 10.8013C14.0921 10.2188 13.7489 9.6836 13.4177 9.19286C14.6105 7.35183 15.5944 6.43448 16.7646 6.43448C19.1956 6.43448 21.1404 10.0138 21.1404 14.4103C21.1404 16.0862 20.5915 17.0586 19.4542 17.0586C18.3641 17.0586 17.8434 16.3387 15.7737 13.0085Z"
                    fill="rgba(255,255,255,1)"
                  ></path>
                </svg>
              </Link>
            </div>
            <div className="p-5 bg-black rounded-full">
              <Link href="/user/login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path
                    d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"
                    fill="rgba(255,255,255,1)"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
          <div>
            <p className="mt-6 text-center">
              Been here before?
              <span className="text-[#5fd043]">
                <Link href="/user/login"> Log in</Link>
              </span>
            </p>
          </div>
        </div>
        <div className="hidden pt-10 image lg:block lg:pointer-events-none lg:w-[50%]">
          <img src="/register_img.png" alt="register_image" />
        </div>
      </main>
    </>
  );
};
