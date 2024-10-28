import { AiFillDislike, AiOutlineDislike } from "react-icons/ai";
import axiosInstance from "../../../../../../../../../../../../../../../../../../services/axios";
import { AxiosError } from "axios";
import { useGlobalContext } from "../../../../../../../../../../../../../../../../../GlobalContext";
import {
    CommentType,
    DislikeType,
    LikeType,
} from "../../../../../../../../../../../../../Context/Hooks/useComment";

function DislikeButton({
    comment,
    dislikes,
    setLikes,
    setDislikes,
}: {
    comment: CommentType;
    dislikes: DislikeType[];
    setLikes: React.Dispatch<React.SetStateAction<LikeType[]>>;
    setDislikes: React.Dispatch<React.SetStateAction<DislikeType[]>>;
}) {
    const { user } = useGlobalContext();

    const isCommentAlreadyDisliked = dislikes.some(
        (dislike) => dislike.studentId === user.id,
    );

    const dislikeComment = async () => {
        try {
            const response = await axiosInstance.get(
                `/comment/dislike/${comment._id}/dislike`,
            );
            if (response.data.success) {
                setDislikes(response.data.dislikes);
                setLikes(response.data.likes);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
            }
        }
    };

    const cancelDislikeComment = async () => {
        try {
            const response = await axiosInstance.get(
                `/comment/dislike/${comment._id}/cancel`,
            );
            if (response.data.success) {
                setDislikes(response.data.dislikes);
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
                    isCommentAlreadyDisliked
                        ? cancelDislikeComment
                        : dislikeComment
                }
            >
                {isCommentAlreadyDisliked ? (
                    <AiFillDislike size={20} color="red" />
                ) : (
                    <AiOutlineDislike size={20} />
                )}
            </button>
            <p className=" font-light text-sm">{dislikes.length}</p>
        </div>
    );
}

export default DislikeButton;
