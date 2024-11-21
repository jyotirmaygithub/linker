import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

const ChatBot: React.FC = () => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("whole");

  // Reference to the textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Adjust height dynamically based on content
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  function handleChatBot(e: React.FormEvent) {
    e.preventDefault();

    if (!query) {
      toast.error("Enter your message.");
      return;
    }

    console.log("function is working", query);

    axios
      .post("http://localhost:5000/api/chatBot/chat-bot", { query })
      .then((response) => {
        const data = response.data;
        console.log("response server side =", data);
      })
      .catch((error) => {
        console.log("server side error = ", error);
      });

    console.log("Query submitted:", query, "Search type:", searchType);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setQuery(e.target.value);
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSearchType(e.target.value);
  }

  return (
    <div className="flex items-center justify-center w-full max-w-4xl">
      <div className="relative w-full flex items-center">
        <select
          value={searchType}
          onChange={handleSelectChange}
          className="px-2 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-gray-400"
        >
          <option value="whole">Whole</option>
          <option value="title">Title</option>
          <option value="content">Content</option>
          <option value="keywords">Keywords</option>
        </select>

        <textarea
          ref={textareaRef} // Attach the ref to the textarea
          value={query}
          onChange={handleInputChange}
          placeholder="Enter your query to help you"
          rows={1} // Start with a single row
          className="w-full px-4 py-2 border-t border-r border-b border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
          style={{ maxHeight: "10rem", overflowY: "auto" }} // Set maxHeight to 5 rows (approx. 10rem)
        />

        <button
          onClick={handleChatBot}
          className="absolute right-4 bottom-0.5 p-1.5 rounded-full focus:outline-none bg-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
