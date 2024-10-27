const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const CommentSchema = require("../models/comment");

const fetchComments = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized action !",
        });
    }

    const token = authHeader.split(" ")[1];
    const { id } = jwt.verify(token, JWT_SECRET);
    const studentId = id;
    const { lectureId } = req.params;

    try {
        const AllLectureComments = await CommentSchema.find({
            lectureId,
        }).populate("studentId");

        return res.status(201).json({
            success: true,
            message: "Comments got successfully ...",
            comments: AllLectureComments,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Unexpected Network error while fetching comments !",
        });
    }
};

const sendComment = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized action !",
        });
    }

    const token = authHeader.split(" ")[1];
    const { id } = jwt.verify(token, JWT_SECRET);
    const studentId = id;
    const { courseId, lectureId, comment } = req.body;

    try {
        //! *** CREATE COMMENT ***
        const NewComment = CommentSchema({
            courseId,
            lectureId,
            studentId,
            comment,
        });

        await NewComment.save();

        if (!NewComment) {
            return res.status(404).json({
                success: false,
                message:
                    "An error ocured while sending comment ! Try again ...",
            });
        }
        //! *************************

        //! *** RETURN ALL COMMENTS OF THAT LECTURE TO CLIENT ***
        const AllLectureComments = await CommentSchema.find({ lectureId });

        return res.status(201).json({
            success: true,
            message: "Comment sent successfully ...",
            comments: AllLectureComments,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unexpected Network Error !",
        });
    }
};

const sendReply = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized action !",
        });
    }

    const token = authHeader.split(" ")[1];
    const { id } = jwt.verify(token, JWT_SECRET);
    const studentId = id;
    const { courseId, lectureId, comment } = req.body;
    console.log({ courseId, lectureId, comment });
    //! Here i am !!!

    // try {
    //     //! *** CREATE COMMENT ***
    //     const NewComment = CommentSchema({
    //         courseId,
    //         lectureId,
    //         studentId,
    //         comment,
    //     });

    //     await NewComment.save();

    //     if (!NewComment) {
    //         return res.status(404).json({
    //             success: false,
    //             message:
    //                 "An error ocured while sending comment ! Try again ...",
    //         });
    //     }
    //     //! *************************

    //     //! *** RETURN ALL COMMENTS OF THAT LECTURE TO CLIENT ***
    //     const AllLectureComments = await CommentSchema.find({ lectureId });

    //     return res.status(201).json({
    //         success: true,
    //         message: "Comment sent successfully ...",
    //         comments: AllLectureComments,
    //     });
    // } catch (error) {
    //     return res.status(500).json({
    //         success: false,
    //         message: "Unexpected Network Error !",
    //     });
    // }
};

const likeComment = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized action !",
        });
    }
    const token = authHeader.split(" ")[1];
    const { id } = jwt.verify(token, JWT_SECRET);
    const studentId = id;
    const { commentId, action } = req.params;

    try {
        if (action === "like") {
            const LikedComment = await CommentSchema.findByIdAndUpdate(
                commentId,
                {
                    $push: { likes: { studentId } },
                    $pull: { dislikes: { studentId } },
                },
                { new: true, runValidators: true },
            );

            if (!LikedComment) {
                return res.status(404).json({
                    success: false,
                    message: "An error while likeComment !",
                });
            }

            return res.status(201).json({
                success: true,
                message: "You liked the comment !",
                likes: LikedComment.likes,
                dislikes: LikedComment.dislikes,
            });
        } else {
            const LikeCanceledComment = await CommentSchema.findByIdAndUpdate(
                commentId,
                {
                    $pull: { likes: { studentId } },
                },
                { new: true, runValidators: true },
            );

            if (!LikeCanceledComment) {
                return res.status(404).json({
                    success: false,
                    message: "An error while likeComment !",
                });
            }

            return res.status(201).json({
                success: true,
                message: "You liked the comment !",
                likes: LikeCanceledComment.likes,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Network error while likeComment !",
        });
    }
};

const dislikeComment = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized action !",
        });
    }
    const token = authHeader.split(" ")[1];
    const { id } = jwt.verify(token, JWT_SECRET);
    const studentId = id;
    const { commentId, action } = req.params;

    try {
        if (action === "dislike") {
            const DislikedComment = await CommentSchema.findByIdAndUpdate(
                commentId,
                {
                    $push: { dislikes: { studentId } },
                    $pull: { likes: { studentId } },
                },
                { new: true, runValidators: true },
            );

            if (!DislikedComment) {
                return res.status(404).json({
                    success: false,
                    message: "An error while likeComment !",
                });
            }

            return res.status(201).json({
                success: true,
                message: "You liked the comment !",
                dislikes: DislikedComment.dislikes,
                likes: DislikedComment.likes,
            });
        } else {
            const DislikeCanceledComment =
                await CommentSchema.findByIdAndUpdate(
                    commentId,
                    {
                        $pull: { dislikes: { studentId } },
                    },
                    { new: true, runValidators: true },
                );

            if (!DislikeCanceledComment) {
                return res.status(404).json({
                    success: false,
                    message: "An error while likeComment !",
                });
            }

            return res.status(201).json({
                success: true,
                message: "You liked the comment !",
                dislikes: DislikeCanceledComment.dislikes,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Network error while likeComment !",
        });
    }
};

module.exports = {
    fetchComments,
    sendComment,
    sendReply,
    likeComment,
    dislikeComment,
};
