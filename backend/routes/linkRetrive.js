const Link = require("../models/linkData");
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

router.get("/singleLink/:id", async (req, res) => {
    try {
        // Extract the ID from the request parameters
        const { id } = req.params;
        console.log("id link =",id)

        // Find the link by its ObjectId
        const link = await Link.findById(id);
        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }

        // Respond with the link data
        res.json({ link });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occurred");
    }
});


module.exports = router;
