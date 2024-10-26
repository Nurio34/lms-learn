import ProfileImage from "./Components/ProfileImage";
import TextArea from "./Components/TextArea";
import EmojiComponent from "./Components/EmojiComponent";
import CancelButton from "./Components/CancelButton";
import CommitTheCommentButton from "./Components/CommitTheCommentButton";
import { useProgressContext } from "../../../../../../../../Context";

function CommentArea() {
    const { isTextAreaFocused } = useProgressContext();

    return (
        <div className="grid grid-cols-[auto,1fr] gap-x-3">
            <ProfileImage />
            <div className=" space-y-2">
                <TextArea />
                {isTextAreaFocused && (
                    <div className=" flex items-center justify-between">
                        <EmojiComponent />
                        <div className="space-x-3">
                            <CancelButton />
                            <CommitTheCommentButton />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentArea;
