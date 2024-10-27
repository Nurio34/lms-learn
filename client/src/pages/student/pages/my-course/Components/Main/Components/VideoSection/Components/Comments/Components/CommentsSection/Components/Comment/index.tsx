import { useEffect, useState } from "react";
import { CommentType } from "../../../../../../../../../../Context/Hooks/useComment";
import { UserType } from "../../../../../../../../../../../../../../GlobalContext";
import { AxiosError } from "axios";
import axiosInstance from "../../../../../../../../../../../../../../../services/axios";
import ProfilePicture from "./Components/ProfilePicture";
import TheComment from "./Components/TheComment";
import CommentInterractions from "./Components/CommentInterractions";
import CommentArea from "../../../CommentArea";
import Replies from "./Components/Replies";
import NameTimeUpdateDelete from "./Components/NameTimeUpdateDelete";

function Comment({ comment }: { comment: CommentType }) {
    const [commentOwner, setCommentOwner] = useState({} as UserType);
    const [isReplying, setIsReplying] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [commentToEdit, setCommentToEdit] = useState("");
    const [editingCommentId, setEditingCommentId] = useState("");

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance(
                `/auth/get-user-info/${comment.studentId!._id}`,
            );

            if (response.data.success) {
                setCommentOwner(response.data.user);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        if (comment.studentId?._id) {
            getUserInfo();
            setIsReplying(false);
        }
    }, [comment]);

    return (
        <>
            {isEditing ? (
                <CommentArea
                    isEditing={isEditing}
                    commentToEdit={commentToEdit}
                    editingCommentId={editingCommentId}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <li className="flex gap-3">
                    <ProfilePicture />
                    <div className="grow">
                        <NameTimeUpdateDelete
                            commentOwner={commentOwner}
                            comment={comment}
                            setIsEditing={setIsEditing}
                            setCommentToEdit={setCommentToEdit}
                            setEditingCommentId={setEditingCommentId}
                        />
                        <TheComment comment={comment.comment} />
                        <CommentInterractions
                            comment={comment}
                            setIsReplying={setIsReplying}
                        />
                        <div className="py-2">
                            <CommentArea
                                isReplying={isReplying}
                                commentToReply={comment}
                                userToReply={commentOwner}
                                setIsReplying={setIsReplying}
                                mainCommentId={
                                    comment.mainCommentId || comment._id
                                }
                            />
                        </div>
                        {<Replies comment={comment} />}
                    </div>
                </li>
            )}
        </>
    );
}

export default Comment;
