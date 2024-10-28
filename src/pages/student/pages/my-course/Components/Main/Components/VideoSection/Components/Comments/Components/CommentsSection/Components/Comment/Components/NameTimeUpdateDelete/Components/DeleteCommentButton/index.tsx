import { MdDeleteOutline } from "react-icons/md";
import { CommentType } from "../../../../../../../../../../../../../../Context/Hooks/useComment";
import { useProgressContext } from "../../../../../../../../../../../../../../Context";
import { useState } from "react";

function DeleteCommentButton({ comment }: { comment: CommentType }) {
    const { deleteComment } = useProgressContext();
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <>
            {isDeleting && (
                <div className=" fixed top-0 left-0 w-screen h-screen  bg-[rgba(0,0,0,0.5)] grid place-content-center">
                    <div className=" bg-white py-6 px-12 rounded-lg shadow-lg space-y-3">
                        <p className=" text-black">
                            Are you sure to delete the comment ?
                        </p>
                        <div className="flex gap-3 items-center">
                            <button
                                type="button"
                                className="grow c-btn bg-[red] hover:bg-red-500 text-white"
                                onClick={() => setIsDeleting(false)}
                            >
                                No
                            </button>
                            <button
                                type="button"
                                className="grow c-btn bg-[green] hover:bg-green-500 text-white"
                                onClick={() => {
                                    if (comment._id) {
                                        deleteComment(comment._id);
                                    }
                                }}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <button
                type="button"
                className="border-2 p-1 border-transparent transition-all hover:rounded-full hover:border-[red] hover:scale-105"
                onClick={() => {
                    setIsDeleting(true);
                }}
            >
                <MdDeleteOutline size={20} />
            </button>
        </>
    );
}

export default DeleteCommentButton;
