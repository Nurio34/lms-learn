import { UserType } from "../../../../../../../../../../../../../../GlobalContext";
import { useProgressContext } from "../../../../../../../../../../Context";
import { CommentType } from "../../../../../../../../../../Context/Hooks/useComment";

function CommitTheCommentButton({
    setIsTextAreaFocused,
    setComment,
    setIsEmojiPickerOpen,
    comment,
    commentType,
    commentToReply,
    userToReply,
    setIsReplying,
    isEditing,
    editingCommentId,
    setIsEditing,
    mainCommentId,
}: {
    setIsTextAreaFocused: React.Dispatch<React.SetStateAction<boolean>>;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    setIsEmojiPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    comment: string;
    commentType: "comment" | "reply";
    commentToReply?: CommentType;
    userToReply?: UserType;
    setIsReplying?: React.Dispatch<React.SetStateAction<boolean>>;
    isEditing?: boolean;
    editingCommentId?: string;
    setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
    mainCommentId?: string;
}) {
    const { sendComment, sendReply, editComment } = useProgressContext();

    return (
        <button
            type="button"
            className="c-btn bg-[green] hover:bg-green-500 text-white"
            onClick={() => {
                if (isEditing) {
                    if (editingCommentId) {
                        editComment(editingCommentId, comment);
                        if (setIsEditing) {
                            setIsEditing(false);
                        }
                    }
                } else {
                    if (commentType === "comment") {
                        sendComment(comment, commentType);
                    } else {
                        sendReply(
                            commentType,
                            comment,
                            commentToReply!,
                            userToReply!,
                            mainCommentId!,
                        );
                    }
                }

                setIsTextAreaFocused(false);
                setComment("");
                setIsEmojiPickerOpen(false);
                if (setIsReplying) {
                    setIsReplying(false);
                }
            }}
        >
            {isEditing ? "Save" : "Comment"}
        </button>
    );
}

export default CommitTheCommentButton;
