import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { getAuthToken } from "../../redux/authToken";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CommentBox = () => {
  const [comment, setComment] = useState("");
  const navigation = useNavigate();
  const { id } = useParams();
  console.log("link_id = ", id);

  const handleSubmit = () => {
    if (comment.trim()) {
      const token = getAuthToken();

      axios
        .post(
          `${process.env.REACT_APP_DEV_URL}/api/comment/comment-data`,
          {
            link_id: id,
            comment: comment,
          },
          {
            headers: {
              "auth-token": token, // Send the auth token in the headers
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          toast.success("Comment submitted successfully!");
          setComment("");
        })
        .catch((error) => console.error("Error:", error));

      // setComment(""); // Clear the input after submission
    } else {
      navigation("/login");
    }
  };

  return (
    <>
      <div className="space-y-2">
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Write your comment here..."
          value={comment}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-fit px-10 py-2 text-white bg-black rounded-full hover:bg-gray-900 focus:outline-none"
        >
          Submit Comment
        </button>
      </div>
    </>
  );
};

export default CommentBox;
