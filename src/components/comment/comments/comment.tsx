import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import UserComment from "./userComment";

interface Comment {
  commenterName: string;
  avatar: string;
  comment: string;
}

const CommentBox = () => {
  const { id } = useParams();

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (!id) return; // Prevent API call if id is undefined

    axios
      .get(`${process.env.REACT_APP_DEV_URL}/api/comment/link-comments/${id}`)
      .then((response) => {
        console.log("Fetched comments:", response.data);
        setComments(response.data); // Store comments in state
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [id]); // Added id as a dependency

  return (
    <div className="space-y-4">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index}>
            <hr className="border-t-4 border-gray-200 p-2"></hr>
            <UserComment
              name={comment.commenterName}
              avatarUrl={comment.avatar}
              comment={comment.comment}
              index={0}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-lg text-center py-4">
          Be the first to comment on this link!
        </p>
      )}
    </div>
  );
};

export default CommentBox;
