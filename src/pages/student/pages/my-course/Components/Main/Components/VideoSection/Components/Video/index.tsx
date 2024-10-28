import VideoPlayer from "../../../../../../../../../../components/ReactPlayer";
import { useProgressContext } from "../../../../../../Context";

function Video() {
    const { playingLecture } = useProgressContext();

    return (
        <section>
            <VideoPlayer lecture={playingLecture!} />
            <p className="c-subtitle">{playingLecture?.title}</p>
        </section>
    );
}

export default Video;
