import { useEffect, useState } from "react";

const useComment = () => {
    const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
    const [comment, setComment] = useState("");
    const [indexToPutEmoji, setIndexToPutEmoji] = useState(0);
    const [isAnyIndexSelected, setIsAnyIndexSelected] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

    useEffect(() => {
        if (clickCount > 1) {
            setIsAnyIndexSelected(true);
        }
    }, [clickCount]);

    return {
        isTextAreaFocused,
        setIsTextAreaFocused,
        comment,
        setComment,
        indexToPutEmoji,
        setIndexToPutEmoji,
        isAnyIndexSelected,
        setIsAnyIndexSelected,
        clickCount,
        setClickCount,
        isEmojiPickerOpen,
        setIsEmojiPickerOpen,
    };
};

export default useComment;
