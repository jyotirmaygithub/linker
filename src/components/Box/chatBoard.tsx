// ChatBoard.tsx
import React from 'react';

interface Message {
  title: string,
  description: string,
  keywords: [],
}

interface ChatBoardProps {
  messages: Message | null;
  searchType: string;
}

const ChatBoard: React.FC<ChatBoardProps> = ({ messages ,searchType }) => {
    console.log("message from backend = ",messages)
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4 bg-gray-100 rounded-lg shadow-md">
   
        <div
          className={`p-3 rounded-lg ${message.type === 'query' ? 'bg-blue-200' : 'bg-green-200'}`}
        >
          <p>{message.text}</p>
        </div>
    </div>
  );
};

export default ChatBoard;
