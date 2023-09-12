"use client";

import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();
  const Logout = async () => {
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
  return <button onClick={Logout}>Logout</button>;
};
