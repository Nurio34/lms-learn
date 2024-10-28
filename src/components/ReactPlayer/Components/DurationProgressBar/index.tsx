import ReactPlayer from "react-player";

type DurationProgressBarType = {
    playedRange: number;
    setPlayedRange: React.Dispatch<React.SetStateAction<number>>;
    Player: React.MutableRefObject<ReactPlayer | null>;
    setIsLastSecconds: React.Dispatch<React.SetStateAction<boolean>>;
};

function DurationProgressBar({
    playedRange,
    setPlayedRange,
    Player,
    setIsLastSecconds,
}: DurationProgressBarType) {
    return (
        <input
            type="range"
            min={0}
            max={100}
            className="range bg-gradient-to-b h-5 from-transparent via-white to-transparent range-primary"
            value={playedRange}
            onChange={(e) => {
                const newPlayed = parseFloat(e.target.value);

                setPlayedRange(newPlayed);
                if (Player.current) {
                    Player.current.seekTo(newPlayed / 100);
                }

                setIsLastSecconds(false);
            }}
        />
    );
}

export default DurationProgressBar;
