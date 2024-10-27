import { MdOutlineEdit } from "react-icons/md";
import { CommentType } from "../../../../../../../../../../../../../../Context/Hooks/useComment";

function UpdateCommentButton({
    comment,
    setIsEditing,
    setCommentToEdit,
    setEditingCommentId,
}: {
    comment: CommentType;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setCommentToEdit: React.Dispatch<React.SetStateAction<string>>;
    setEditingCommentId: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <button
            type="button"
            className="border-2 p-1 border-transparent transition-all hover:rounded-full hover:border-[green] hover:scale-105"
            onClick={() => {
                setIsEditing(true);
                setCommentToEdit(comment.comment);
                if (comment._id) {
                    setEditingCommentId(comment._id);
                }
            }}
        >
            <MdOutlineEdit />
        </button>
    );
}

export default UpdateCommentButton;
