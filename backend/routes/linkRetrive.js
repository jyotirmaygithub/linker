const Link = require("../models/linkData");
const User = require("../models/user");
const express = require("express");
const router = express.Router();
require("dotenv").config();

// ROUTE 1 : Creating a new user account POST : /api/auth/createuser
router.get(
    "/linkRetrive",
    async (req, res) => {
        try {
            // Check if the link already exists
            let links = await Link.find({});
            if (!links) {
                return res.status(400).json({ message: "No link found" });
            }

            res.json({ links })

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error occurred");
        }
    }
);

router.get("/link-userData/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("🔹 Received ID:", id);

        // Find the link by ID
        const link = await Link.findById(id);
        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }

        console.log("✅ Link found:", link);

        // Fetch user data **excluding the password**
        const userData = await User.findById(link.user_id).select("-password"); // 🔥 Exclude password
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("✅ User data fetched:", userData);

        // Return both `link` and `userData` in a **single response**
        res.json({ link, userData });
    } catch (error) {
        console.error("❌ Error:", error.message);
        res.status(500).send("Internal server error occurred");
    }
});



module.exports = router;
