import { SiTicktick } from "react-icons/si";
import "./index.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// let time: React.NodeJS.Timeout | null = null;

function LoadingAnimation({
    isPurchased,
    courseId,
}: {
    isPurchased: boolean;
    courseId: string;
}) {
    const loading = "processing.........";

    const [isAnim, setIsAnim] = useState<boolean>(false);

    useEffect(() => {
        if (!isAnim) {
            setIsAnim(true);
        }
    }, [isAnim]);

    const [animMap, setAnimMap] = useState<{ [key: number]: number }>(() => {
        return loading.split("").reduce((obj, item, ind) => {
            obj[ind] = 0;
            return obj;
        }, {} as { [key: number]: number });
    });

    useEffect(() => {
        if (Object.values(animMap).every((item) => item === 1)) {
            setAnimMap(
                loading.split("").reduce((obj, item, ind) => {
                    obj[ind] = 0;
                    return obj;
                }, {} as { [key: number]: number }),
            );
        }
    }, [animMap]);

    const navigate = useNavigate();

    useEffect(() => {
        let time: ReturnType<typeof setTimeout>;
        if (isPurchased) {
            time = setTimeout(() => {
                navigate(`/student/my-courses/${courseId}`);
            }, 2000);
        }

        return () => {
            if (isPurchased) {
                clearTimeout(time);
            }
        };
    }, [isPurchased]);
    return (
        <div className="h-full">
            {isPurchased ? (
                <div className="grid justify-items-center gap-6 pt-10">
                    <SiTicktick size={100} color="green" />
                    <p className=" font-bold text-lg">
                        Payment Complated Successfully ...
                    </p>
                </div>
            ) : (
                <div className=" flex justify-center items-center overflow-hidden h-full">
                    {isAnim && (
                        <ul
                            className="flex"
                            style={
                                {
                                    "--length": loading.length,
                                } as React.CSSProperties
                            }
                        >
                            {loading.split("").map((ch, ind) => {
                                return (
                                    <li
                                        key={ind}
                                        className="Animation4_Li capitalize font-bold text-3xl tracking-widest font-sans mb-10"
                                        style={
                                            {
                                                WebkitTextStroke:
                                                    ind <= 12
                                                        ? "1px white"
                                                        : "",
                                                visibility:
                                                    ind > 12 ? "hidden" : "",
                                                "--delay": ind,
                                                animationPlayState: isAnim
                                                    ? "running"
                                                    : "paused",
                                            } as React.CSSProperties
                                        }
                                        onAnimationEnd={() => {
                                            setAnimMap((pre) => ({
                                                ...pre,
                                                [ind]: 1,
                                            }));
                                            if (ind === loading.length - 1) {
                                                setIsAnim(false);
                                            }
                                        }}
                                    >
                                        {ch}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default LoadingAnimation;
