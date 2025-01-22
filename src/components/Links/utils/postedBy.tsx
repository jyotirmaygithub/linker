import React from "react";
import Avatar from "@mui/material/Avatar";

interface PostedByProps {
  name?: string;
}

const PostedBy: React.FC<PostedByProps> = ({ name }) => {
  // Function to get initials from the name
  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  return (
    <div className="flex items-center space-x-2 text-gray-700">
      {name && (
        <Avatar 
          sx={{ width: 28, height: 28, fontSize: 14, bgcolor: "pink" }} 
        >
          {getInitials(name)}
        </Avatar>
      )}
    </div>
  );
};

export default PostedBy;
