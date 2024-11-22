// src/components/KeywordTag.tsx
import React from 'react';

interface KeywordTagProps {
  keyword: string;
  onRemove: (keyword: string) => void;
}

const KeywordTag: React.FC<KeywordTagProps> = ({ keyword, onRemove }) => {
  return (
    <div
      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center space-x-2"
    >
      <span>{keyword}</span>
      <button
        type="button"
        onClick={() => onRemove(keyword)}
        className="text-red-500 hover:text-red-700"
      >
        &times;
      </button>
    </div>
  );
};

export default KeywordTag;
