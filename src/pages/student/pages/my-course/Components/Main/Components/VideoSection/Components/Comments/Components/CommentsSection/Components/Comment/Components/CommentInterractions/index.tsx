import LikeButton from "./LikeButton";
import {
    CommentType,
    DislikeType,
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
    const [likes, setLikes] = useState<LikeType[]>(
        comment.likes || ([] as LikeType[]),
    );
    const [dislikes, setDislikes] = useState<DislikeType[]>(
        comment.dislikes || ([] as DislikeType[]),
    );

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
