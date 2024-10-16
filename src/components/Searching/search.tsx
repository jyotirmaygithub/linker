// src/components/SearchBar.tsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import ExtractData from "../dataExtraction/extract";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleLink = (event: React.FormEvent) => {
    event.preventDefault();
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    const disallowedKeywords = /(sex|porn|adult|xxx)/i;

    if (!query) {
      return toast.error("Please enter your link");
    }

    if (!urlPattern.test(query)) {
      toast.error("Invalid URL. Please enter a valid link.");
      return;
    }

    if (disallowedKeywords.test(query)) {
      toast.error(
        "URL contains disallowed content. Please enter a different link."
      );
      return;
    }

    // fetchMetadata(query);
    console.log("Uploading link:", query);
    // Implement your link upload logic here
  };

  return (
    <div className="flex justify-center items-center w-full mt-10">
      <form
        onSubmit={handleLink}
        className="flex flex-col items-center w-full max-w-4xl space-y-4"
      >
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Paste your link for upload"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <button
          type="submit"
          className="w-fit px-10 py-2 text-white bg-black rounded-full hover:bg-gray-900 focus:outline-none"
        >
          Upload link
        </button>
      </form>
      {/* <ExtractData fetchMetadata={fetchMetadata()}/> */}
    </div>
  );
};

export default SearchBar;
