const express = require("express");
const {
    fetchComments,
    sendComment,
    sendReply,
    likeComment,
    dislikeComment,
} = require("../controllers/comment");
const router = express.Router();

router.get("/fetch/:lectureId", fetchComments);
router.post("/send", sendComment);
router.post("/reply", sendReply);
router.get("/like/:commentId/:action", likeComment);
router.get("/dislike/:commentId/:action", dislikeComment);

module.exports = router;
