const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkData = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    url: {
        type: String,
        required: true,
    },
    linkUploadedDate: {
        type: Date,
        default: Date.now,
    },
    linkerName: {
        type: String,
        default: "Linker",
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
    clickCount:{
        type: Number,
        default: 1,
    }
});
const Link = mongoose.model("link", linkData);
module.exports = Link;
