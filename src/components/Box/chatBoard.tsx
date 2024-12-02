import React, { useEffect, useState } from "react";
import KeywordTag from "../tag/keyword";

interface Message {
  title: string;
  description: string;
  keywords: string[];
}

interface ChatBoardProps {
  messages: Message | null;
  searchType: string;
}

const ChatBoard: React.FC<ChatBoardProps> = ({ messages, searchType }) => {
  const [messageKeywords, setMessageKeywords] = useState<string[]>([]);

  const removeKeyword = (keywordToRemove: string) => {
    setMessageKeywords(messageKeywords.filter((keyword) => keyword !== keywordToRemove));
  };


  useEffect(() => {
    if (messages?.keywords) {
      setMessageKeywords(messages.keywords);
    } else {
      setMessageKeywords([]);
    }
  }, [messages]);
  console.log("message from backend = ", messages?.title);
  console.log("messsage keywords = ,", messageKeywords);

  function capitalizeFirstLetter(searchType: string){
    return searchType.charAt(0).toUpperCase() + searchType.slice(1);
  }

  return (
    <div
      className="w-full max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md"
      style={{ height: "250px", overflowY: "auto" }}
    >
      <div className="p-3 rounded-lg">
        <div className="space-y-5">
          <p className="font-bold">{capitalizeFirstLetter(searchType)} :</p>
          {searchType === "title" && <p>{messages?.title}</p>}
          {searchType === "description" && <p>{messages?.description}</p>}
          <div className="flex space-x-2">
          {searchType === "keywords" && messageKeywords.map((keyword) => (
            <KeywordTag
              key={keyword}
              keyword={keyword}
              onRemove={removeKeyword}
            />
          ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBoard;
