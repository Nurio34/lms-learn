import { useProgressContext } from "../../../../Context";
import "./index.css";
import ComplatedInfoSection from "./Components/ComplatedInfoSection";
import Video from "./Components/Video";
import Comments from "./Components/Comments";

function VideoSection() {
    const { isLoading, error, myCourse } = useProgressContext();

    if (isLoading || !myCourse._id) return <p>Loading ... Please wait !</p>;

    if (error) return <p>{error}</p>;
    if (myCourse._id)
        return (
            <section
                className="grow bg-[rgba(0,0,0,0.8)] text-white px-[12vw] pt-[2vh] overflow-y-scroll"
                style={{ scrollbarWidth: "none" }}
            >
                <Video />
                <Comments />
                <ComplatedInfoSection />
            </section>
        );
}

export default VideoSection;
