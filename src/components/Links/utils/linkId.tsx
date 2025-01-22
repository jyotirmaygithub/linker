import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

interface LinkId {
  Id: string | null;
}

const LinkUi: React.FC<LinkId> = ({ Id }) => {
  const handleLinkClick = async () => {
    if (!Id) {
      console.error("Invalid link ID");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/linkStore/clickUrl/${Id}`);
      console.log("Link response = ", response.data);
    } catch (error) {
      console.error("Error fetching link details: ", error);
    }
  };

  return (
    <Link
      to={`/link/${Id}`}
      className="text-gray-500 hover:underline mt-2"
      onClick={handleLinkClick}
    >
      Read More
    </Link>
  );
};

export default LinkUi;
