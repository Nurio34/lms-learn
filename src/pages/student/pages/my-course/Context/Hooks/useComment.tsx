import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../../../services/axios";
import toast from "react-hot-toast";
import { UserSchema, UserType } from "../../../../../../GlobalContext";
import { z } from "zod";

export const LikeSchema = z.object({
  studentId: z.string(),
});

export type LikeType = z.infer<typeof LikeSchema>;

export const DislikeSchema = z.object({
  studentId: z.string(),
});

export type DislikeType = z.infer<typeof DislikeSchema>;

export const CommentSchema = z.object({
  courseId: z.string().min(1, "Course ID is required."),
  lectureId: z.string().min(1, "Lecture ID is required."),
  studentId: UserSchema.optional(),
  commentType: z.string().min(1, "Comment type is required."),
  comment: z.string().min(1, "Comment is required."),
  repliedCommentId: z.string().optional(),
  repliedStudentId: z.string().optional(),
  repliedStudentName: z.string().optional(),
  mainCommentId: z.string().optional(),
  likes: z.array(LikeSchema).optional(),
  dislikes: z.array(DislikeSchema).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _id: z.string().optional(),
});

export type CommentType = z.infer<typeof CommentSchema>;

const useComment = (courseId: string, lectureId: string | undefined) => {
  const [comments, setComments] = useState([] as CommentType[]);
  const [errors, setErrors] = useState([] as any[]);

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
  const sendComment = async (
    comment: string,
    commentType: "comment" | "reply"
  ) => {
    const result = CommentSchema.safeParse({
      courseId,
      lectureId,
      commentType,
      comment,
    });

    if (!result.success) {
      setErrors(Object.entries(result.error?.flatten().fieldErrors));
      return;
    }

    try {
      const response = await axiosInstance.post("/comment/send", result.data);

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

  //! *** REPLY COMMENT ***
  const sendReply = async (
    commentType: "comment" | "reply",
    comment: string,
    commentToReply: CommentType,
    userToReply: UserType,
    mainCommentId: string
  ) => {
    const result = CommentSchema.safeParse({
      courseId: commentToReply.courseId,
      lectureId: commentToReply.lectureId,
      commentType,
      comment,
      repliedCommentId: commentToReply._id,
      repliedStudentId: userToReply._id,
      repliedStudentName: userToReply.username,
      mainCommentId,
    });

    if (!result.success) {
      setErrors(Object.entries(result.error?.flatten().fieldErrors));
      return;
    }

    try {
      const response = await axiosInstance.post("/comment/reply", result.data);

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

  //! *** EDİT COMMENT ***
  const editComment = async (commentId: string, comment: string) => {
    try {
      const response = await axiosInstance.patch("/comment/edit", {
        commentId,
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
  //! *********************

  //! *** DELETE COMMENT ***
  const deleteComment = async (commentId: string) => {
    try {
      const response = await axiosInstance.delete("/comment/delete", {
        data: { commentId, lectureId },
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
  //! **********************

  return {
    comments,
    setComments,
    sendComment,
    sendReply,
    errors,
    setErrors,
    editComment,
    deleteComment,
  };
};

export default useComment;
