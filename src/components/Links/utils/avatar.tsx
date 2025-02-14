import React from "react";
import Avatar from "@mui/material/Avatar";

interface PostedByProps {
  name?: string;
  size?: number;
}

// Define a color for each letter (A-Z)
const letterColors: Record<string, string> = {
  A: "#F44336", B: "#E91E63", C: "#9C27B0", D: "#673AB7", E: "#3F51B5",
  F: "#2196F3", G: "#03A9F4", H: "#00BCD4", I: "#009688", J: "#4CAF50",
  K: "#8BC34A", L: "#CDDC39", M: "#FFEB3B", N: "#FFC107", O: "#FF9800",
  P: "#FF5722", Q: "#795548", R: "#9E9E9E", S: "#607D8B", T: "#FF1744",
  U: "#D500F9", V: "#651FFF", W: "#00BFA5", X: "#76FF03", Y: "#F57F17",
  Z: "#A1887F"
};

// Function to get initials from the name
const getInitials = (fullName: string) => {
  return fullName
    .split(" ")
    .map((word) => word[0]?.toUpperCase())
    .join("");
};

// Function to get background color based on first letter
const getBackgroundColor = (name: string) => {
  const firstLetter = name[0]?.toUpperCase();
  return letterColors[firstLetter] || "#BDBDBD"; // Default gray if no match
};

const PostedBy: React.FC<PostedByProps> = ({ name, size = 40 }) => {
  return (
    <div className="flex items-center space-x-2 text-gray-700">
      {name && (
        <Avatar 
          sx={{ 
            width: size, 
            height: size, 
            fontSize: 14, 
            bgcolor: getBackgroundColor(name) 
          }} 
        >
          {getInitials(name)}
        </Avatar>
      )}
    </div>
  );
};

export default PostedBy;
