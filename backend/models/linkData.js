const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkData = new Schema({
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    keywords: {
        type: [],
        required: true,
    },
});
const Link = mongoose.model("link", linkData);
module.exports = Link;
