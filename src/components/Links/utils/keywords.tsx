import React from "react";

interface KeywordData {
  keywords: string[] | undefined;
}

// Function to generate random color
const getRandomColor = () => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-teal-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const LinkUi: React.FC<KeywordData> = ({ keywords }) => {
  const renderKeywords = (keywords: string[]) => {
    return keywords.map((keyword, index) => (
      <div key={index} className="inline-flex items-center mb-2">
        {/* Circular Dot */}
        <div className={`${getRandomColor()} w-3 h-3 rounded-full mr-2`} />
        {/* Keyword */}
        <span className="text-sm text-gray-800">
          {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
        </span>
      </div>
    ));
  };

  return (
    <div className="text-gray-600 mt-2 space-x-4">
      {keywords ? renderKeywords(keywords) : null}
    </div>
  );
};

export default LinkUi;
