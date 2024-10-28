import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

type useRewindReturnType = {
    isComplated: boolean;
    isLast5Seconds: boolean;
    setIsLastSecconds: React.Dispatch<React.SetStateAction<boolean>>;
};

const useRewind = (
    time: {
        totalTime: string;
        playedTime: string;
    },
    PlayerRef: React.MutableRefObject<ReactPlayer | null>,
    playedRange: number,
): useRewindReturnType => {
    const [isComplated, setIsComplated] = useState(false);

    useEffect(() => {
        setIsComplated(time.playedTime === time.totalTime);
    }, [time]);

    const [isLast5Seconds, setIsLastSecconds] = useState(false);

    useEffect(() => {
        if (PlayerRef.current) {
            const timeDif =
                PlayerRef.current?.getDuration() -
                PlayerRef.current?.getCurrentTime();

            if (timeDif !== 0 && timeDif <= 5) {
                setIsLastSecconds(true);
            }
        }
    }, [playedRange]);

    return { isComplated, isLast5Seconds, setIsLastSecconds };
};

export default useRewind;
