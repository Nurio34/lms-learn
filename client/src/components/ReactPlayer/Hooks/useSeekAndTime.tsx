import { useEffect, useState } from "react";
import getFormattedTime from "../../../../utils/getFormattedTime";
import ReactPlayer from "react-player";

const useSeekAndTime = (Player: React.MutableRefObject<ReactPlayer | null>) => {
    const [playedRange, setPlayedRange] = useState(0);
    const [time, setTime] = useState({
        totalTime: "0",
        playedTime: "00:00:00",
    });

    useEffect(() => {
        if (Player.current) {
            //! *** GET CURRENT TIME ***
            const time = Player.current.getCurrentTime();
            const formattedTime = getFormattedTime(time);
            setTime((prev) => ({ ...prev, playedTime: formattedTime }));
            //! ************************
        }
    }, [playedRange]);

    return { playedRange, setPlayedRange, time, setTime };
};

export default useSeekAndTime;
