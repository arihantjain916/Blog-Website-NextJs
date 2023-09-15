import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const LogoutButton = () => {
  const router = useRouter();
  const [isToken, setToken] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = Cookies.get("JWT_AUTH_TOKEN");
      setToken(!!token);
    };
    checkToken();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/user/logout/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        router.push("/user/login");
        Cookies.remove("JWT_AUTH_TOKEN");
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Toaster />
      {isToken ? (
        <button
          onClick={handleLogout}
          className="mr-3 border-2 px-8 py-3 rounded-full bg-blue-500 text-white outline-none"
        >
          Logout
        </button>
      ) : (
        <button className="mr-3 border-2 px-8 py-3 rounded-full bg-blue-500 text-white outline-none">
          <Link href="/user/login">Login</Link>
        </button>
      )}
    </>
  );
};
