import React from "react";
import { Link } from "react-router-dom";

interface LinkId {
  Id: string | null;
}

const LinkUi: React.FC<LinkId> = ({ Id }) => {
  return (
      <Link
        to={`/link/${Id}`}
        className="text-gray-500 hover:underline mt-2"
      >
        Read More
      </Link>
  );
};

export default LinkUi;
