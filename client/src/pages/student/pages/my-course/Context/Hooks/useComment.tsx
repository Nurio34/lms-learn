import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../../../services/axios";
import toast from "react-hot-toast";

export type LikeType = {
    studentId: string;
};
export type DislikeType = {
    studentId: string;
};

export type ReplyType = {
    studentId: String;
    comment: String;
    likes: LikeType[];
};

export type CommentType = {
    courseId: string;
    lectureId: string;
    studentId: string;
    comment: string;
    likes: LikeType[];
    dislikes: DislikeType[];
    replies: ReplyType[];
    createdAt: Date;
    updatedAt: Date;
    _id: string;
};

const useComment = (courseId: string, lectureId: string | undefined) => {
    const [comments, setComments] = useState([] as CommentType[]);

    //! *** FETCH COMMENTS ***
    const fetchComments = async (lectureId: string) => {
        try {
            const response = await axiosInstance(`/comment/fetch/${lectureId}`);

            if (response.data.success) {
                setComments(response.data.comments);
                toast.success(response.data.message);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    };

    useEffect(() => {
        if (lectureId) {
            fetchComments(lectureId);
        }
    }, [lectureId]);
    //! **********************

    //! *** SEND COMMENT ***
    const sendComment = async (comment: string) => {
        try {
            const response = await axiosInstance.post("/comment/send", {
                courseId,
                lectureId,
                comment,
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setComments(response.data.comments);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    };
    //! ********************

    //! *** SEND COMMENT ***
    const sendReply = async (comment: string) => {
        try {
            const response = await axiosInstance.post("/comment/reply", {
                courseId,
                lectureId,
                comment,
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setComments(response.data.comments);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    };
    //! ********************

    return {
        comments,
        setComments,
        sendComment,
        sendReply,
    };
};

export default useComment;
