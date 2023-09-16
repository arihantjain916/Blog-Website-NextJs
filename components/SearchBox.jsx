import { useState, useEffect } from "react";

export const SearchBox = () => {
  const [search, setSearch] = useState(null); // Initialize search state as null
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/blog/search?search=${search}`);
      if (response.status === 200) {
        const data = await response.json();
        setResults(data.blogs);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setResults([]);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search !== null && search.trim() !== "") {
      fetchData();
    } else {
      setResults([]);
    }
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  // Update the search state when the input value changes
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue === "" ? null : inputValue);
  };

  return (
    <main className="p-10">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={search === null ? "" : search} // Ensure input value is not null
            onChange={handleInputChange} // Updated event handler
            className="w-64 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? (
              <span>Loading...</span>
            ) : (
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
            )}
          </button>
        </div>
      </form>
      
    </main>
  );
};
