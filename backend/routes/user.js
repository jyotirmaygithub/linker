const express = require("express");
const router = express.Router();
const user = require("../models/user");
const fetchUserId = require("../middleware/fetchUserId");
require("dotenv").config();


router.get("/user-data", fetchUserId, async (req, res) => {
    try {
        let userDocument = await user
            .findById({ _id: req.userId })
            .select("-password");
        res.json({ user_data: userDocument });
    } catch (error) {
        // throw errors.
        console.error(error.message);
        res.status(500).send("Internal server Error Occured");
    }
});

module.exports = router;