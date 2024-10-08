import { useEffect, useState } from "react";
import { useVolume } from "./useVolume";

const usePlayPause = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const { isMuted } = useVolume();

    const pauseVideo = () => {
        setIsPlaying(false);
    };

    const playVideo = () => {
        setIsPlaying(true);
    };

    useEffect(() => {
        if (isMuted) {
            playVideo();
        } else {
            pauseVideo();
        }
    }, [isMuted]);

    return { isPlaying, pauseVideo, playVideo };
};

export default usePlayPause;
