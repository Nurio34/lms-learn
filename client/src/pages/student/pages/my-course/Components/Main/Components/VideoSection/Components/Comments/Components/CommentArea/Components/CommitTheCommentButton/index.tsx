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
}: {
    setIsTextAreaFocused: React.Dispatch<React.SetStateAction<boolean>>;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    setIsEmojiPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    comment: string;
    commentType: "comment" | "reply";
    commentToReply?: CommentType;
    userToReply?: UserType;
}) {
    const { sendComment, sendReply } = useProgressContext();

    return (
        <button
            type="button"
            className="c-btn bg-[green] hover:bg-green-500 text-white"
            onClick={() => {
                if (commentType === "comment") {
                    sendComment(comment);
                } else {
                    sendReply(comment, commentToReply!, userToReply!);
                }
                setIsTextAreaFocused(false);
                setComment("");
                setIsEmojiPickerOpen(false);
            }}
        >
            Comment
        </button>
    );
}

export default CommitTheCommentButton;
