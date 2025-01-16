import React, { useState } from "react";

interface SearchBoxProps {
    showSearchBox: boolean;
}

export default function SearchLogo () {

  return (
    <div className="absolute right-48 top-20">
        <input
          type="text"
          placeholder="Search..."
          className="border border-black p-2 ml-2"
          style={{ width: "400px" }}
        />
    </div>
  );
}

