import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const SearchBox = () => {
  const router = useRouter();
  const [search, setSearch] = useState(""); // Initialize with an empty string

  const handleSubmit = async (e) => {
    e.preventDefault();
    router.push(`/blog?search=${search}`);
  };

  return (
    <main className="p-10">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="absolute inset-y-0 right-0 px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </form>
    </main>
  );
};
