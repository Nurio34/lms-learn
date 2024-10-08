import { FaVolumeUp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

type VolumeContainerType = {
    isFullScreen: boolean;
    isVolumeRangeVisible: boolean;
    handleOnClickVolumeButton: () => void;
    handleOnMouseEnterToVolumeRange: () => void;
    handleOnMouseLeaveFromVolumeRange: () => void;
    handleVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
    volume: number;
    time: {
        totalTime: string;
        playedTime: string;
    };
};

function VolumeContainer({
    isFullScreen,
    isVolumeRangeVisible,
    handleOnClickVolumeButton,
    handleOnMouseEnterToVolumeRange,
    handleOnMouseLeaveFromVolumeRange,
    handleVolume,
    volume,
    time,
}: VolumeContainerType) {
    return (
        <div className="flex gap-3 items-center relative">
            <button type="button" onClick={handleOnClickVolumeButton}>
                <FaVolumeUp
                    size={20}
                    className={`${
                        isFullScreen ? "text-2xl text-blue-500" : ""
                    }`}
                />
            </button>
            <div className="flex gap-3 items-center relative">
                <AnimatePresence>
                    {isVolumeRangeVisible && (
                        <motion.input
                            initial={{
                                x: "-16px",
                                opacity: 0,
                            }}
                            animate={{
                                x: "0",
                                opacity: 1,
                            }}
                            exit={{ x: "-16px", opacity: 0 }}
                            type="range"
                            min={0}
                            max={100}
                            className="range range-xs w-16 bg-gradient-to-b from-transparent via-white to-transparent range-primary"
                            onMouseLeave={handleOnMouseLeaveFromVolumeRange}
                            onMouseEnter={handleOnMouseEnterToVolumeRange}
                            onChange={handleVolume}
                            defaultValue={volume * 100}
                        />
                    )}
                </AnimatePresence>

                <motion.p
                    className="text-sm text-white absolute w-max"
                    initial={{ x: 0 }}
                    animate={{
                        x: isVolumeRangeVisible ? "82px" : "0",
                    }}
                >
                    {time.playedTime} / {time.totalTime}
                </motion.p>
            </div>
        </div>
    );
}

export default VolumeContainer;
