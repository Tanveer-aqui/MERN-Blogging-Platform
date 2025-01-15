import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BlogList from "../components/Blog/BlogList";
import Loading from "../components/Loading/Loading";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/blogs`;

const Search = () => {
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState("");
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    setQuery(searchQuery);

    if (searchQuery) {
      axios
        .get(`${API_URL}/search?search=${searchQuery}`)
        .then((res) => {
          setBlogs(res.data.data.data);
        })
        .catch((e) => {
          console.error("Error fetching search results", e);
        })
        .finally(() => {
          setLoading(false);
      })
    }
  }, [searchParams]);

  return (
    <div className="mx-5">
      <div className="w-full lg:w-1/2 lg:ml-[100px] mb-3 text-gray-100 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 py-4 px-4 lg:py-6 lg:px-4">
        <h1 className="text-3xl font-extrabold text-zinc-300 flex gap-2 items-center">
          Search results for {query}
        </h1>
      </div>
      <div className="w-full lg:w-1/2 lg:ml-[100px] mb-3 text-gray-100 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
        {blogs.length > 0 ? (
          <BlogList blogs={blogs} />
        ) : (
          <>
            {loading ? (
              <Loading/>
            ) : (
              <div className="text-gray-300 text-lg px-4 flex flex-col items-start">
                <p>No results found for <span className="font-semibold text-sky-400">"{query}"</span>.</p>
                <p className="mt-2 text-base text-gray-400">
                  Try searching for other topics or using different keywords.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
