import { AxiosError } from "axios";
import { CommentType } from "../../../../../../../../../../../../Context/Hooks/useComment";
import axiosInstance from "../../../../../../../../../../../../../../../../../services/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Comment from "../..";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

function Replies({ comment }: { comment: CommentType }) {
    const [replies, setReplies] = useState([] as CommentType[]);
    const [isRepliesShown, setIsRepliesShown] = useState(false);

    const fetchRepliesOfComment = async () => {
        try {
            const response = await axiosInstance.get(
                `comment/fetch-replies/${comment._id}`,
            );

            if (response.data.success) {
                setReplies(response.data.replies);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    };

    useEffect(() => {
        fetchRepliesOfComment();
    }, [comment]);

    return (
        <section>
            {replies.length > 0 && (
                <button
                    type="button"
                    className=" flex items-center gap-1 pb-2 text-blue-400"
                    onClick={() => setIsRepliesShown((prev) => !prev)}
                >
                    {isRepliesShown ? (
                        <span>
                            <FaAngleUp />
                        </span>
                    ) : (
                        <span>
                            <FaAngleDown />
                        </span>
                    )}
                    {replies.length} Replies
                </button>
            )}
            <AnimatePresence>
                {isRepliesShown && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            type: "tween",
                            duration: 0.3,
                            ease: "easeInOut",
                        }}
                    >
                        {replies.map((reply) => (
                            <Comment key={reply._id} comment={reply} />
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </section>
    );
}

export default Replies;
