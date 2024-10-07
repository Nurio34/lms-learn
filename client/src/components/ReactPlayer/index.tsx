import ReactPlayer from "react-player/lazy";
import { useInstructerContext } from "../../pages/instructer/InstructerContext";
import { FaPlay, FaVolumeUp } from "react-icons/fa";
import { TbRewindBackward5, TbRewindForward5 } from "react-icons/tb";

export type VideoPlayerType = {
    lecture: number;
};

function VideoPlayer({ lecture }: VideoPlayerType) {
    const { curriculumForm } = useInstructerContext();
    return (
        <div className="w-96 aspect-video relative">
            <ReactPlayer
                url={curriculumForm[lecture].videoUrl}
                width={"100%"}
                height={"100%"}
            />
            <div className=" absolute bottom-0 w-full">
                <input
                    type="range"
                    min={0}
                    max={100}
                    className="range h-[4px]"
                />
                <div className="flex gap-6 items-center">
                    <button type="button">
                        <FaPlay color="white" />
                    </button>
                    <div className="flex gap-3">
                        <button type="button">
                            <TbRewindBackward5 color="white" />
                        </button>
                        <button type="button">
                            <TbRewindForward5 color="white" />
                        </button>
                    </div>
                    <button type="button" className="flex gap-3">
                        <FaVolumeUp color="white" />
                        <input
                            type="range"
                            min={0}
                            max={100}
                            className="range range-xs w-16 bg-black range-primary"
                        />
                    </button>
                    <div>1:20:13 / 2.32.13</div>
                </div>
            </div>
        </div>
    );
}

export default VideoPlayer;
