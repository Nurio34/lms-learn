const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
    studentId: String,
});
const DislikeSchema = new mongoose.Schema({
    studentId: String,
});

const ReplySchema = new mongoose.Schema({
    studentId: String,
    comment: String,
    likes: [LikeSchema],
});

const CommentSchema = new mongoose.Schema(
    {
        courseId: String,
        lectureId: String,
        studentId: String,
        comment: String,
        likes: [LikeSchema],
        dislikes: [DislikeSchema],
        replies: [ReplySchema],
    },
    { timestamps: true },
);

module.exports = mongoose.model("Comments", CommentSchema);
