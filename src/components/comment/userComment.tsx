import React from "react";
import { Avatar, Card, CardHeader, Typography, CardContent } from "@mui/material";

export interface CommentProps {
  name: string;
  avatarUrl: string;
  comment: string;
}

const Comment: React.FC<CommentProps> = ({ name, avatarUrl, comment }) => {
  return (
    <Card sx={{ maxWidth: 500, margin: "10px auto", padding: "10px", boxShadow: 3 }}>
      <CardHeader
        avatar={<Avatar src={avatarUrl} alt={name} />}
        title={<Typography variant="h6">{name}</Typography>}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
