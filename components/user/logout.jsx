
import Cookies from "js-cookie";

export const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/user/logout/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
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
    <div>
      <button
        onClick={handleLogout}
        className="mr-3 border-2 px-8 py-3 rounded-full bg-blue-500 text-white outline-none"
      >
        Logout
      </button>
    </div>
  );
};
