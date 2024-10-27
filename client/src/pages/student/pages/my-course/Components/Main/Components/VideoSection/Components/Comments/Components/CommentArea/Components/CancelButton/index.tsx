function CancelButton({
    setIsTextAreaFocused,
    setComment,
    setIsEmojiPickerOpen,
}: {
    setIsTextAreaFocused: React.Dispatch<React.SetStateAction<boolean>>;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    setIsEmojiPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <button
            type="button"
            className="c-btn bg-[red] hover:bg-red-500 text-white"
            onClick={() => {
                setIsTextAreaFocused(false);
                setComment("");
                setIsEmojiPickerOpen(false);
            }}
        >
            Cancel
        </button>
    );
}

export default CancelButton;
