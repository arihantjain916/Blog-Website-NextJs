"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

export const LogoutButton = () => {
  const router = useRouter();
  const [isToken, setToken] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = Cookies.get("JWT_AUTH_TOKEN");
        if (token) {
          setToken(true);
        } 
      } catch (error) {
        console.error("Error fetching JWT_AUTH_TOKEN cookie:", error);
      }
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
    <div>
      {isToken ? (
        <button onClick={handleLogout} className="px-10 py-5 text-center text-white bg-blue-700 rounded-full">
          <p>
            Logout
          </p>
        </button>
      ) : (
        <div>
          
          <p className="p-4 px-8 mt-3 text-center text-white bg-blue-700 rounded-full">
            <Link href="/user/login">Login</Link>
          </p>
        </div>
      )}
    </div>
  );
};
