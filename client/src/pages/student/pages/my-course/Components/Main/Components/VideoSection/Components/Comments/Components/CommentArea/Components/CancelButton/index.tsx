function CancelButton({
    setIsTextAreaFocused,
    setComment,
    setIsEmojiPickerOpen,
    setIsReplying,
    setIsEditing,
}: {
    setIsTextAreaFocused: React.Dispatch<React.SetStateAction<boolean>>;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    setIsEmojiPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsReplying?: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditing?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}) {
    return (
        <button
            type="button"
            className="c-btn bg-[red] hover:bg-red-500 text-white"
            onClick={() => {
                setIsTextAreaFocused(false);
                setComment("");
                setIsEmojiPickerOpen(false);
                if (setIsReplying) {
                    setIsReplying(false);
                }
                if (setIsEditing) {
                    setIsEditing(false);
                }
            }}
        >
            Cancel
        </button>
    );
}

export default CancelButton;
