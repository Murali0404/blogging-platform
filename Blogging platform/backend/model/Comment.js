const { required, ref } = require("joi");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true,
    },
    posted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    },
},{
    timestamps: true,
})

const Comment = mongoose.model("comment", commentSchema)

module.exports = Comment;