import { TbRewindBackward5, TbRewindForward5 } from "react-icons/tb";
import ReactPlayer from "react-player";

type RewindButtonsType = {
    isFullScreen: boolean;
    Player: React.MutableRefObject<ReactPlayer | null>;
    isComplated: boolean;
    isLast5Seconds: boolean;
    setIsLastSecconds: React.Dispatch<React.SetStateAction<boolean>>;
};

function RewindButtons({
    isFullScreen,
    Player,
    isComplated,
    isLast5Seconds,
    setIsLastSecconds,
}: RewindButtonsType) {
    const back5 = () => {
        setIsLastSecconds(false);
        if (Player.current) {
            const time = Player.current.getCurrentTime();
            Player.current.seekTo(time - 5);
        }
    };
    const forward5 = () => {
        setIsLastSecconds(false);
        if (Player.current) {
            const time = Player.current.getCurrentTime();
            Player.current.seekTo(time + 5);
        }
    };

    return (
        <div className="flex gap-3">
            <button type="button" onClick={back5}>
                <TbRewindBackward5
                    color="white"
                    size={20}
                    className={`${isFullScreen && "text-lg"}`}
                />
            </button>
            <button
                type="button"
                onClick={() => {
                    if (isComplated || isLast5Seconds) {
                        return;
                    }
                    forward5();
                }}
            >
                <TbRewindForward5
                    color="white"
                    size={20}
                    className={`${isFullScreen && "text-lg"}`}
                />
            </button>
        </div>
    );
}

export default RewindButtons;
