import EmojiPicker from "emoji-picker-react";
import { useProgressContext } from "../../../../../../../../../../Context";

function EmojiComponent() {
    const {
        setIsTextAreaFocused,
        comment,
        setComment,
        indexToPutEmoji,
        isAnyIndexSelected,
        isEmojiPickerOpen,
        setIsEmojiPickerOpen,
    } = useProgressContext();

    const toggleEmojiPicker = () => {
        setIsTextAreaFocused(true);
        setIsEmojiPickerOpen((prev) => !prev);
    };

    return (
        <div className=" relative">
            <button type="button" onClick={toggleEmojiPicker}>
                🙂
            </button>
            {/* <div className="absolute">
                <EmojiPicker
                    open={isEmojiPickerOpen}
                    onEmojiClick={(e) => {
                        const updatedComment = comment.match(/[\s\S]/gu) || [];
                        console.log({ comment, updatedComment });

                        if (!isAnyIndexSelected) {
                            console.log("Not Selected");

                            updatedComment.splice(
                                updatedComment.length,
                                0,
                                e.emoji,
                            );
                        } else {
                            console.log("Selected");

                            updatedComment.splice(indexToPutEmoji, 0, e.emoji);
                        }
                        setComment(updatedComment.join(""));
                    }}
                />
            </div> */}
        </div>
    );
}

export default EmojiComponent;
