import React, { useState } from "react";

interface SearchBoxProps {
    showSearchBox: boolean;
}

const SearchLogo:  React.FC<SearchBoxProps> = ({showSearchBox}) => {

  return (
    <div className="absolute right-48 top-20">
      {showSearchBox && (
        <input
          type="text"
          placeholder="Search..."
          className="border border-black p-2 ml-2"
          style={{ width: "400px" }}
        />
      )}
    </div>
  );
}


export default SearchLogo