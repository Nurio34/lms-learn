import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import axiosInstance from "../../../../../../../../../../../../../../../../../../services/axios";
import { AxiosError } from "axios";
import { useGlobalContext } from "../../../../../../../../../../../../../../../../../GlobalContext";
import {
    CommentType,
    DislikeType,
    LikeType,
} from "../../../../../../../../../../../../../Context/Hooks/useComment";

function LikeButton({
    comment,
    likes,
    setLikes,
    setDislikes,
}: {
    comment: CommentType;
    likes: LikeType[];
    setLikes: React.Dispatch<React.SetStateAction<LikeType[]>>;
    setDislikes: React.Dispatch<React.SetStateAction<DislikeType[]>>;
}) {
    const { user } = useGlobalContext();

    const isCommentAlreadyLiked = likes.some(
        (like) => like.studentId === user.id,
    );

    const likeComment = async () => {
        try {
            const response = await axiosInstance.get(
                `/comment/like/${comment._id}/like`,
            );
            if (response.data.success) {
                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
            }
        }
    };

    const cancelLikeComment = async () => {
        try {
            const response = await axiosInstance.get(
                `/comment/like/${comment._id}/cancel`,
            );
            if (response.data.success) {
                setLikes(response.data.likes);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
            }
        }
    };

    return (
        <div className="flex gap-1 items-center">
            <button
                type="button"
                onClick={
                    isCommentAlreadyLiked ? cancelLikeComment : likeComment
                }
            >
                {isCommentAlreadyLiked ? (
                    <AiFillLike size={20} color="rgba(60,150,255)" />
                ) : (
                    <AiOutlineLike size={20} />
                )}
            </button>
            <p className=" font-light text-sm">{likes.length}</p>
        </div>
    );
}

export default LikeButton;
