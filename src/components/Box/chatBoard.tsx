import React, { useEffect, useState } from "react";
import KeywordTag from "../tag/keyword";
import { useDispatch } from "react-redux";
import { setGptSelection } from "../../redux/gptSelectionSlice";

interface Message {
  title: string;
  description: string;
  keywords: string[];
}

interface ChatBoardProps {
  messages: Message | null;
  searchType: string;
}

interface userPreferedData {
  usersearchType: string;
  gptData: Message | null;
}

const ChatBoard: React.FC<ChatBoardProps> = ({ messages, searchType }) => {
  console.log("entire message", messages);
  console.log("search =", searchType);
  const [messageKeywords, setMessageKeywords] = useState<string[]>([]);
  const dispatch = useDispatch();

  const removeKeyword = (keywordToRemove: string) => {
    setMessageKeywords(
      messageKeywords.filter((keyword) => keyword !== keywordToRemove)
    );
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

  function capitalizeFirstLetter(searchType: string) {
    return searchType.charAt(0).toUpperCase() + searchType.slice(1);
  }

  function handlePreferedData() {
    if (messages) {
      console.log("message for = ", messages);
     dispatch(setGptSelection({
        usersearchType: searchType,
        gptData: messages,
      }));
    }
  }

  return (
    <div
      className="w-full max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md"
      style={{ height: "250px", overflowY: "auto" }}
    >
      <div className="p-3 rounded-lg">
        <div className="space-y-5">
          <p className="font-bold">{capitalizeFirstLetter(searchType)} :</p>
          {searchType === "whole" && (
            <div className="space-y-4">
              <p>{messages?.title}</p>
              <p>{messages?.description}</p>
              <div className="flex space-x-4">
                {messageKeywords.map((keyword) => (
                  <KeywordTag
                    key={keyword}
                    keyword={keyword}
                    onRemove={removeKeyword}
                  />
                ))}
              </div>
            </div>
          )}
          {searchType === "title" && <p>{messages?.title}</p>}
          {searchType === "description" && <p>{messages?.description}</p>}
          <div className="flex space-x-2">
            {searchType === "keywords" &&
              messageKeywords.map((keyword) => (
                <KeywordTag
                  key={keyword}
                  keyword={keyword}
                  onRemove={removeKeyword}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handlePreferedData}
          className="w-fit px-10 py-2 text-white bg-black rounded-full hover:bg-gray-900 focus:outline-none"
        >
          Press to use content
        </button>
      </div>
    </div>
  );
};

export default ChatBoard;
