import LikeButton from "./LikeButton";
import {
    CommentType,
    LikeType,
} from "../../../../../../../../../../../../Context/Hooks/useComment";
import DislikeButton from "./DislikeButton";
import { useState } from "react";
import ReplyButton from "./ReplyButton";

function CommentInterractions({
    comment,
    setIsReplying,
}: {
    comment: CommentType;
    setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [likes, setLikes] = useState<LikeType[]>(comment.likes);
    const [dislikes, setDislikes] = useState<LikeType[]>(comment.dislikes);

    return (
        <div className="flex items-center gap-3">
            <LikeButton
                comment={comment}
                likes={likes}
                setLikes={setLikes}
                setDislikes={setDislikes}
            />
            <DislikeButton
                comment={comment}
                dislikes={dislikes}
                setLikes={setLikes}
                setDislikes={setDislikes}
            />
            <ReplyButton setIsReplying={setIsReplying} />
        </div>
    );
}

export default CommentInterractions;
