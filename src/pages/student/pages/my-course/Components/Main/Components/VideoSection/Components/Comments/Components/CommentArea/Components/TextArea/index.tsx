import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useProgressContext } from "../../../../../../../../../../Context";

function TextArea({
    isTextAreaFocused,
    setIsTextAreaFocused,
    comment,
    setComment,
    commentToEdit,
}: {
    isTextAreaFocused: boolean;
    setIsTextAreaFocused: React.Dispatch<React.SetStateAction<boolean>>;
    comment: string;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    commentToEdit?: string;
}) {
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const target = e.currentTarget;

        target.style.height = `${target.scrollHeight}px`;
    };

    const { errors, setErrors } = useProgressContext();

    useEffect(() => {
        if (commentToEdit) {
            setComment(commentToEdit);
        }
    }, [commentToEdit]);

    return (
        <div>
            <div className=" relative">
                <textarea
                    name="comment"
                    id="comment"
                    placeholder={
                        errors?.filter(
                            (arr) => arr[0] === "comment",
                        )[0]?.[1]?.[0] || "Comment Here ..."
                    }
                    className={`w-full bg-transparent text-white outline-none resize-none
                        ${
                            errors?.filter(
                                (arr) => arr[0] === "comment",
                            )[0]?.[1]?.[0] &&
                            "placeholder:text-red-500 placeholder:font-bold placeholder:text-sm"
                        }
                        `}
                    onFocus={() => {
                        setIsTextAreaFocused(true);
                        setErrors([]);
                    }}
                    onInput={handleInput}
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                    value={comment}
                ></textarea>
                <div className="absolute w-full h-[1px] bg-black"></div>
                <div className="absolute w-full h-[2px] grid grid-cols-2">
                    <AnimatePresence>
                        {isTextAreaFocused && (
                            <motion.div
                                key={1}
                                className="h-full w-full bg-white origin-right"
                                initial={{
                                    scaleX: 0,
                                }}
                                animate={{ scaleX: 1 }}
                                exit={{ scaleX: 0 }}
                                transition={{
                                    type: "tween",
                                    duration: 0.5,
                                }}
                            ></motion.div>
                        )}
                        {isTextAreaFocused && (
                            <motion.div
                                key={2}
                                className="h-full bg-white origin-left"
                                initial={{
                                    scaleX: 0,
                                }}
                                animate={{ scaleX: 1 }}
                                exit={{ scaleX: 0 }}
                                transition={{
                                    type: "tween",
                                    duration: 0.5,
                                }}
                            ></motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default TextArea;
