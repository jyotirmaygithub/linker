import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface ViewCounterProps {
  views: number | undefined;
}

const ViewCounter: React.FC<ViewCounterProps> = ({ views }) => {
  return (
    <div className="flex items-center space-x-1 text-gray-700">
      <VisibilityIcon fontSize="small" />
      <span className="font-medium">{views} Views</span>
    </div>
  );
};

export default ViewCounter;
