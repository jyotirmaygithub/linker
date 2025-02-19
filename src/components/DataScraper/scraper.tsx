// src/components/SearchBar.tsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import DataBox from "../Box/dataBox";
import Loader from "../../utils/loader/loading";
import { getAuthToken } from "../../redux/authToken";

interface ExtractedData {
  title: string;
  content: string;
  keywords: string[];
}
const SearchBar: React.FC = () => {
  const [url, setUrl] = useState("");
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(
    null
  );
  const [dataLoading, setDataLoading] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
  const token = getAuthToken();

  const handleLink = (event: React.FormEvent) => {
    event.preventDefault();
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    const disallowedKeywords = /(sex|porn|adult|xxx)/i;

    if (!url) {
      return toast.error("Please enter your link");
    }

    if (!urlPattern.test(url)) {
      toast.error("Invalid URL. Please enter a valid link.");
      return;
    }

    if (disallowedKeywords.test(url)) {
      toast.error(
        "URL contains disallowed content. Please enter a different link."
      );
      return;
    }
    console.log("Uploading link:", url);

    setDataLoading(true);
    axios
      .post("http://localhost:5000/api/dataScrape/scrape", { url })
      .then((response) => {
        const data = response.data;
        setDataLoading(false);
        setExtractedData({
          title: data.title,
          content: data.content,
          keywords: data.keywords,
        });
        console.log("response server side =", response.data);
        console.log("title = ", response.data.title);
        console.log("description = ", response.data.content);
        console.log("keywords = ", response.data.keywords);
      })
      .catch((error) => {
        console.log("server side error = ", error);
      });
  };

  function handleSave() {
    if (!extractedData) {
      return toast.error("No data to save. Please scrape a valid link.");
    }

    axios
      .post(
        `${process.env.REACT_APP_DEV_URL}/api/linkStore/linkStorage`,
        {
          url,
          title: extractedData.title,
          content: extractedData.content,
          keywords: extractedData.keywords,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((response) => {
        console.log("✅ Response from server:", response);
        toast.success("Link saved successfully!");
      })
      .catch((error) => {
        console.error("❌ Server-side error:", error);
        toast.error("Failed to save the link.");
      });
  }

  return (
    <div className="flex flex-col justify-center items-center w-full my-10 space-y-5">
      <form
        onSubmit={handleLink}
        className="flex flex-col items-center w-full max-w-4xl space-y-4"
      >
        <input
          type="text"
          value={url}
          onChange={handleInputChange}
          placeholder="Paste your link for upload"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        {!extractedData && (
          <button
            type="submit"
            className="w-fit px-10 py-2 text-white bg-black rounded-full hover:bg-gray-900 focus:outline-none"
          >
            Upload link
          </button>
        )}
      </form>
      {dataLoading && (
        <div className="my-10">
          <Loader loaderColor={"black"} loaderSize={40} />
        </div>
      )}
      {extractedData && (
        <DataBox
          title={extractedData.title}
          content={extractedData.content}
          keywords={extractedData.keywords}
        />
      )}
      {extractedData && (
        <button
          onClick={handleSave}
          className="w-fit px-10 py-2 text-white bg-black rounded-full hover:bg-gray-900 focus:outline-none"
        >
          Upload link
        </button>
      )}
    </div>
  );
};

export default SearchBar;
