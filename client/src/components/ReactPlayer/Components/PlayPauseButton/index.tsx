import { FaPause, FaPlay } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";
import ReactPlayer from "react-player";

type PlayPauseButtonType = {
    isFullScreen: boolean;
    isPlaying: boolean;
    playVideo: () => void;
    pauseVideo: () => void;
    isComplated: boolean;
    Player: React.MutableRefObject<ReactPlayer | null>;
    setIsLastSecconds: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

function PlayPauseButton({
    isFullScreen,
    isPlaying,
    playVideo,
    pauseVideo,
    isComplated,
    Player,
    setIsLastSecconds,
    setIsPlaying,
}: PlayPauseButtonType) {
    return (
        <button
            type="button"
            onClick={() => {
                if (isComplated) {
                    setIsLastSecconds(false);

                    if (Player.current) {
                        Player.current.seekTo(0);
                        setIsPlaying(true);
                        console.log("Set isPlaying from PlayPauseButton");
                    }
                } else {
                    if (isPlaying) {
                        pauseVideo();
                    } else {
                        playVideo();
                    }
                }
            }}
        >
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
