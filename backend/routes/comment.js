const express = require("express");
const router = express.Router();
const user = require("../models/user");
const fetchUserId = require("../middleware/fetchUserId");
const Comment = require("../models/comment");
require("dotenv").config();

router.post("/comment-data", fetchUserId, async (req, res) => {
    console.log("function called")
    const { link_id, comment } = req.body;
    console.log("link_id = ", link_id);
    console.log("comment = ", comment);

    if (!link_id || !comment) {
        return res.status(400).json({ message: "Link ID and comment are required" });
    }

    try {
        const userDocument = await user.findById(req.userId).select("-password");

        if (!userDocument) {
            return res.status(404).json({ message: "User not found" });
        }

      let to =  await Comment.create({
            user_id: req.userId,
            link_id: link_id,
            commenterName: userDocument.username,  // Storing as "username", but will return as "name"
            commenterEmail: userDocument.email,
            comment: comment,
        });

        console.log("to = ", to);

        return res.status(201).json({ 
            message: "Comment added successfully", 
            user_data: {
                name: userDocument.username,  // Frontend expects "name"
                _id: userDocument._id 
            }
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/link-comments/:id", async (req, res) => {
    console.log("Function called");

    const { id } = req.params;
    console.log("link_id =", id);

    if (!id) {
        return res.status(400).json({ message: "Link ID is required" });
    }

    try {
        // Find comments associated with the link_id
        const comments = await Comment.find({ link_id: id });
        console.log("comments =", comments);

        return res.status(200).json(comments); // Send back the comments

    } catch (error) {
        console.error("Error fetching comments:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
