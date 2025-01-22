// src/components/SearchBar.tsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import * as cheerio from "cheerio"; // To parse HTML content


interface ExtractDataProps {
  validatedUrl: string;
  }

const ExtractData: React.FC<ExtractDataProps> = ({validatedUrl}) => {

  useEffect(()=>{
    fetchMetadata(validatedUrl);
  },[validatedUrl])

  const fetchMetadata = async (url: string) => {
    console.log("new url =",url);
    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent": "Mozilla/5.0", // Some sites require a User-Agent header
        },
      });
      const html = response.data;
      const $ = cheerio.load(html); // Load the HTML into cheerio

      // Extract title and description
      const title = $("title").text();
      const description = $('meta[name="description"]').attr("content") || "";
      const keywords = $('meta[name="keywords"]').attr("content") || "";

      console.log("title and description =", title ," and  ", description);
      return { title, description, keywords };
    } catch (error) {
      toast.error("Error fetching metadata. Please check the URL.");
      console.error("Error fetching metadata:", error);
      throw error;
    }
  };

  // const handleLink = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   try {
  //     const metadata = await fetchMetadata(query);
  //     console.log("Fetched Metadata:", metadata);
  //     // Implement your logic to use the fetched metadata (title, description, keywords)
  //   } catch (error) {
  //     // Handle any errors that might occur during the fetching
  //   }
  // };

  return <div className="flex justify-center items-center w-full mt-10"></div>;
};

export default ExtractData;
