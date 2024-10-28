import {
    useGlobalContext,
    UserType,
} from "../../../../../../../../../../../../../../../../GlobalContext";
import { CommentType } from "../../../../../../../../../../../../Context/Hooks/useComment";
import DeleteCommentButton from "./Components/DeleteCommentButton";
import UpdateCommentButton from "./Components/UpdateCommentButton";

function NameTimeUpdateDelete({
    commentOwner,
    comment,
    setIsEditing,
    setCommentToEdit,
    setEditingCommentId,
}: {
    commentOwner: UserType;
    comment: CommentType;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setCommentToEdit: React.Dispatch<React.SetStateAction<string>>;
    setEditingCommentId: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user, isSmallScreen } = useGlobalContext();

    function findTimeDiff(date: Date) {
        const diff = (new Date().getTime() - new Date(date).getTime()) / 1000;

        const secs = Math.floor(diff % 60);
        const mins = Math.floor((diff / 60) % 60);
        const hours = Math.floor((diff / 3600) % 24);

        if (hours === 0 && mins === 0) {
            return `${secs} ${isSmallScreen ? "s" : "seconds"} ago`;
        }

        if (hours === 0 && mins !== 0) {
            return `${mins} ${isSmallScreen ? "m" : "minutes"} ago`;
        }
        if (hours !== 0) {
            return `${hours} ${isSmallScreen ? "h" : "hours"} ago`;
        }
    }

    return (
        <div className="flex gap-6 items-center w-max">
            <p className=" font-semibold">@{commentOwner.username}</p>
            <p className=" font-light text-sm">
                {findTimeDiff(comment.createdAt!)}
            </p>
            {comment.studentId?._id === user.id && (
                <div className="ml-auto flex gap-2 items-center">
                    <UpdateCommentButton
                        comment={comment}
                        setIsEditing={setIsEditing}
                        setCommentToEdit={setCommentToEdit}
                        setEditingCommentId={setEditingCommentId}
                    />
                    <DeleteCommentButton comment={comment} />
                </div>
            )}
        </div>
    );
}

export default NameTimeUpdateDelete;
