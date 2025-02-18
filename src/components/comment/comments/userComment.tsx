import React from "react";
import {
  Avatar,
  Card,
  CardHeader,
  Typography,
  CardContent,
} from "@mui/material";
import CommenterAvatar from "../../../utils/avatar";

export interface CommentProps {
  index: number;
  name: string;
  avatarUrl: string;
  comment: string;
}

const Comment: React.FC<CommentProps> = ({
  index,
  name,
  avatarUrl,
  comment,
}) => {
  return (
    <div className="border-gray-400 border-2" key={index}>
      <CardHeader
        avatar={
          <CommenterAvatar name={name} size={30}/>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>
        }
      />
      <CardContent>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ wordBreak: "break-word" }}
        >
          {comment}
        </Typography>
      </CardContent>
    </div>
  );
};

export default Comment;
