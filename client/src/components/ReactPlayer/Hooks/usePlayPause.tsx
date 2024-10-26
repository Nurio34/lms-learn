import { useEffect, useState } from "react";
import { useVolume } from "./useVolume";
import { useGlobalContext } from "../../../GlobalContext";

const usePlayPause = () => {
    const { isVideoComplated } = useGlobalContext();
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

        if (isVideoComplated) {
            pauseVideo();
        }
    }, [isMuted, isVideoComplated]);

    return { isPlaying, setIsPlaying, pauseVideo, playVideo };
};

export default usePlayPause;
