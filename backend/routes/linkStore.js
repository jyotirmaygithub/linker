const Link = require("../models/linkData");
const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchUserId = require("../middleware/fetchUserId");
const router = express.Router();
require("dotenv").config();

// ROUTE 1 : Creating a new user account POST : /api/auth/createuser
router.post(
  "/linkStorage",fetchUserId,
  // Validation middleware
  [
    body("url", "URL is required").notEmpty(),
    body("url", "Invalid URL").isURL(),
    body("title", "Title is required").notEmpty(),
    body("content", "Content is required").notEmpty(),
    body("keywords", "Keywords should be an array of strings").isArray(),
  ],
  async (req, res) => {
    const { url, title, content, keywords } = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log("linkstore = ", keywords);

    try {
      // Check if the link already exists
      let link = await Link.findOne({ url });
      if (link) {
        return res.status(400).json({ message: "Link already exists" });
      }

      // Create a new link
      const newLink = new Link({
        user_id: req.userId,
        url: url,
        title: title,
        content: content,
        keywords: keywords,
      });

      await newLink.save(); // Save the new link in the database

      // Return success response
      res.status(201).json({
        message: "Link stored successfully",
        link: newLink, // You can return the stored link if needed
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occurred");
    }
  }
);


router.put('/clickUrl/:id', async (req, res) => {
  let { id } = req.params
  const link = await Link.findById(id);
  console.log("link find one = ", link);
  if (link) {
    link.clickCount++;
    await link.save();
    res.status(200).json({
      message: "Click count updated"
    });
  } else {
    res.status(404).send('Link not found');
  }
});


module.exports = router;
