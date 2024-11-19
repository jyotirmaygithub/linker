// src/dataExtraction/ExtractData.tsx
import React, { useState } from 'react';
import KeywordTag from '../tag/keyword';

interface ExtractDataProps {
  title: string;
  content: string;
  keywords: string[];
}

const ExtractData: React.FC<ExtractDataProps> = ({ title, content, keywords }) => {
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableContent, setEditableContent] = useState(content);
  const [editableKeywords, setEditableKeywords] = useState(keywords);
  const [newKeyword, setNewKeyword] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value);
  };

  const handleKeywordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewKeyword(value); // Update the newKeyword state
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setEditableKeywords([...editableKeywords, newKeyword.trim()]);
      setNewKeyword(''); // Reset the input field after adding
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setEditableKeywords(editableKeywords.filter((keyword) => keyword !== keywordToRemove));
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-full max-w-4xl">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
        <input
          type="text"
          value={editableTitle}
          onChange={handleTitleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Content:</label>
        <textarea
          value={editableContent}
          onChange={handleContentChange}
          rows={10}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Keywords:</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {editableKeywords.map((keyword) => (
            <KeywordTag
              key={keyword}
              keyword={keyword}
              onRemove={removeKeyword}
            />
          ))}
        </div>
        <div className="flex items-center mt-4">
          <input
            type="text"
            value={newKeyword}
            onChange={handleKeywordInputChange}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 mr-2"
            placeholder="Add a keyword"
          />
          <button
            type="button"
            onClick={handleAddKeyword}
            className="bg-black text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-zinc-800"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtractData;
