import { AnimatePresence, motion } from "framer-motion";
import React from "react";

function TextArea({
    isTextAreaFocused,
    setIsTextAreaFocused,
    comment,
    setComment,
}: {
    isTextAreaFocused: boolean;
    setIsTextAreaFocused: React.Dispatch<React.SetStateAction<boolean>>;
    comment: string;
    setComment: React.Dispatch<React.SetStateAction<string>>;
}) {
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const target = e.currentTarget;

        target.style.height = `${target.scrollHeight}px`;
    };

    return (
        <div>
            <div className=" relative">
                <textarea
                    name="comment"
                    id="comment"
                    placeholder="Comment here ..."
                    className="w-full bg-transparent text-white outline-none resize-none"
                    onFocus={() => {
                        setIsTextAreaFocused(true);
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
