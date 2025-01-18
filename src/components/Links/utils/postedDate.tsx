import React from "react";

interface PostedDateProps {
  date: string | undefined;
}

const PostedDate: React.FC<PostedDateProps> = ({ date }) => {
  // Format the date in "MMM YY" format
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "short",   // e.g., "Jan"
        year: "2-digit",  // e.g., "25"
      })
    : "";

  return (
    <>
      {formattedDate && (
        <div className="text-gray-500 text-sm">
          <span>Posted: </span>
          <span className="font-medium">{formattedDate}</span>
        </div>
      )}
    </>
  );
};

export default PostedDate;
