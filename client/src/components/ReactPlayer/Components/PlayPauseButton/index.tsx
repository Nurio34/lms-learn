import { FaPause, FaPlay } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";

type PlayPauseButtonType = {
    isFullScreen: boolean;
    isPlaying: boolean;
    playVideo: () => void;
    pauseVideo: () => void;
    isComplated: boolean;
};

function PlayPauseButton({
    isFullScreen,
    isPlaying,
    playVideo,
    pauseVideo,
    isComplated,
}: PlayPauseButtonType) {
    return (
        <button type="button" onClick={isPlaying ? pauseVideo : playVideo}>
            {isComplated ? (
                <VscDebugRestart
                    color="white"
                    className={`${isFullScreen && "text-lg"}`}
                />
            ) : isPlaying ? (
                <FaPause
                    color="white"
                    className={`${isFullScreen && "text-lg"}`}
                />
            ) : (
                <FaPlay
                    color="white"
                    className={`${isFullScreen && "text-lg"}`}
                />
            )}
        </button>
    );
}

export default PlayPauseButton;
