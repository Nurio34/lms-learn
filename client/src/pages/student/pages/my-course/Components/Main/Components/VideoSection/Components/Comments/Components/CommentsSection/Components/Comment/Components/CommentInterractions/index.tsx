import LikeButton from "./LikeButton";
import {
    CommentType,
    LikeType,
} from "../../../../../../../../../../../../Context/Hooks/useComment";
import DislikeButton from "./DislikeButton";
import { useState } from "react";

function CommentInterractions({ comment }: { comment: CommentType }) {
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
            <button type="button" className="font-bold text-sm">
                Reply
            </button>
        </div>
    );
}

export default CommentInterractions;
