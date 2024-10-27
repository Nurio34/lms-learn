import { useProgressContext } from "../../../../../../../../../../Context";

function CommitTheCommentButton({
    setIsTextAreaFocused,
    setComment,
    setIsEmojiPickerOpen,
    comment,
    commentType,
}: {
    setIsTextAreaFocused: React.Dispatch<React.SetStateAction<boolean>>;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    setIsEmojiPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    comment: string;
    commentType: "comment" | "reply";
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
                    sendReply(comment);
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
