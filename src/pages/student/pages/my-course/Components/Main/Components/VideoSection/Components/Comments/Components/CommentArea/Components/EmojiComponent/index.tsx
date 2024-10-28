import EmojiPicker from "emoji-picker-react";

function EmojiComponent({
    setIsTextAreaFocused,
    setComment,
    isEmojiPickerOpen,
    setIsEmojiPickerOpen,
}: {
    setIsTextAreaFocused: React.Dispatch<React.SetStateAction<boolean>>;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    isEmojiPickerOpen: boolean;
    setIsEmojiPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const toggleEmojiPicker = () => {
        setIsTextAreaFocused(true);
        setIsEmojiPickerOpen((prev) => !prev);
    };

    return (
        <div className=" relative">
            <button type="button" onClick={toggleEmojiPicker}>
                🙂
            </button>
            <div className="absolute">
                <EmojiPicker
                    open={isEmojiPickerOpen}
                    onEmojiClick={(e) => {
                        setComment((prev) => {
                            return prev + e.emoji;
                        });
                    }}
                />
            </div>
        </div>
    );
}

export default EmojiComponent;
