import ProfileImage from "./Components/ProfileImage";
import TextArea from "./Components/TextArea";
import EmojiComponent from "./Components/EmojiComponent";
import CancelButton from "./Components/CancelButton";
import CommitTheCommentButton from "./Components/CommitTheCommentButton";
import { useEffect, useRef, useState } from "react";

function CommentArea() {
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

    return (
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
                />
                {isTextAreaFocused && (
                    <div className=" flex items-center justify-between">
                        <EmojiComponent
                            setIsTextAreaFocused={setIsTextAreaFocused}
                            setComment={setComment}
                            isEmojiPickerOpen={isEmojiPickerOpen}
                            setIsEmojiPickerOpen={setIsEmojiPickerOpen}
                        />
                        <div className="space-x-3">
                            <CancelButton
                                setIsTextAreaFocused={setIsTextAreaFocused}
                                setComment={setComment}
                                setIsEmojiPickerOpen={setIsEmojiPickerOpen}
                            />
                            <CommitTheCommentButton
                                setIsTextAreaFocused={setIsTextAreaFocused}
                                setComment={setComment}
                                setIsEmojiPickerOpen={setIsEmojiPickerOpen}
                                comment={comment}
                                commentType={commentType}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentArea;
