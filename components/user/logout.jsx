"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

export const LogoutButton = () => {
  const [isToken, setToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for the JWT token when the component mounts
    const token = Cookies.get("JWT_AUTH_TOKEN");
    if (token) {
      setToken(true);
    }
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
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <div>
          <p>You are not logged in!</p>
          <p className="p-4 mt-3 text-center text-white bg-blue-700 rounded-full"><Link href="/user/login">Login</Link></p>
        </div>
      )}
    </div>
  );
};
