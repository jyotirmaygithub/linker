const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentData = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    link_id: {
        type: Schema.Types.ObjectId,
        ref: 'Link',
        required: true,
    },
    commentDate: {
        type: Date,
        default: Date.now,
    },
    commenterName: {
        type: String,
        required: true,

    },
    commenterEmail: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    liked:{
        type: Number,
        default: 0,
    }
});
const Comment = mongoose.model("comment", commentData);
module.exports = Comment;
