import ProfileImage from "./Components/ProfileImage";
import TextArea from "./Components/TextArea";
import EmojiComponent from "./Components/EmojiComponent";
import CancelButton from "./Components/CancelButton";
import CommitTheCommentButton from "./Components/CommitTheCommentButton";
import { useEffect, useRef, useState } from "react";
import { CommentType } from "../../../../../../../../Context/Hooks/useComment";
import {
    useGlobalContext,
    UserType,
} from "../../../../../../../../../../../../GlobalContext";

function CommentArea({
    isReplying = true,
    commentToReply,
    userToReply,
    setIsReplying,
    isEditing,
    commentToEdit,
    editingCommentId,
    setIsEditing,
    mainCommentId,
}: {
    isReplying?: boolean;
    commentToReply?: CommentType;
    userToReply?: UserType;
    setIsReplying?: React.Dispatch<React.SetStateAction<boolean>>;
    isEditing?: boolean;
    commentToEdit?: string;
    editingCommentId?: string;
    setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
    mainCommentId?: string;
}) {
    const { isSmallScreen } = useGlobalContext();
    const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
    const [comment, setComment] = useState("");
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [commentType, setCommentType] = useState<"comment" | "reply">(
        "comment",
    );
    const CommentAreaRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (CommentAreaRef.current) {
            CommentAreaRef.current.nextElementSibling?.classList.contains(
                "CommentsSection",
            )
                ? setCommentType("comment")
                : setCommentType("reply");
        }
    }, []);

    useEffect(() => {
        if (isEditing) {
            setIsTextAreaFocused(true);
        }
    }, [isEditing]);

    return (
        <>
            {isReplying && (
                <div
                    ref={CommentAreaRef}
                    className="grid grid-cols-[auto,1fr] gap-x-3 "
                >
                    <ProfileImage />
                    <div className=" space-y-2">
                        <TextArea
                            isTextAreaFocused={isTextAreaFocused}
                            setIsTextAreaFocused={setIsTextAreaFocused}
                            comment={comment}
                            setComment={setComment}
                            commentToEdit={commentToEdit}
                        />
                        {isTextAreaFocused && (
                            <div className=" flex items-center justify-end md:justify-between">
                                {!isSmallScreen && (
                                    <EmojiComponent
                                        setIsTextAreaFocused={
                                            setIsTextAreaFocused
                                        }
                                        setComment={setComment}
                                        isEmojiPickerOpen={isEmojiPickerOpen}
                                        setIsEmojiPickerOpen={
                                            setIsEmojiPickerOpen
                                        }
                                    />
                                )}
                                <div className="space-x-3">
                                    <CancelButton
                                        setIsTextAreaFocused={
                                            setIsTextAreaFocused
                                        }
                                        setComment={setComment}
                                        setIsEmojiPickerOpen={
                                            setIsEmojiPickerOpen
                                        }
                                        setIsReplying={setIsReplying}
                                        setIsEditing={setIsEditing}
                                    />
                                    <CommitTheCommentButton
                                        setIsTextAreaFocused={
                                            setIsTextAreaFocused
                                        }
                                        setComment={setComment}
                                        setIsEmojiPickerOpen={
                                            setIsEmojiPickerOpen
                                        }
                                        comment={comment}
                                        commentType={commentType}
                                        commentToReply={commentToReply}
                                        userToReply={userToReply}
                                        setIsReplying={setIsReplying}
                                        isEditing={isEditing}
                                        editingCommentId={editingCommentId}
                                        setIsEditing={setIsEditing}
                                        mainCommentId={mainCommentId}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default CommentArea;
