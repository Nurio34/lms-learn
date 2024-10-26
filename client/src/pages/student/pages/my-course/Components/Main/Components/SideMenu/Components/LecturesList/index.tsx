import { useProgressContext } from "../../../../../../Context";
import { SiTicktick } from "react-icons/si";
import { FaGooglePlay } from "react-icons/fa";

function LecturesList() {
    const { myCourse, progress, updatePlayingLecture } = useProgressContext();

    return (
        <ul className="py-1 px-3 inline-grid space-y-3">
            {myCourse?.lectures?.map((lecture, index) => {
                return (
                    <li
                        key={lecture._id}
                        className={` flex items-center gap-2 transition-all origin-left 
                    ${
                        progress.isCourseComplatedOnce &&
                        "hover:font-bold hover:shadow-lg hover:py-1 hover:px-3 hover:scale-105  active:scale-95"
                    }`}
                    >
                        {progress?.lectureProgress[index]?.viewed ? (
                            <SiTicktick color="green" />
                        ) : (
                            <FaGooglePlay color="blue" />
                        )}
                        <button
                            type="button"
                            onClick={() => updatePlayingLecture(index)}
                            disabled={!progress.isCourseComplatedOnce}
                        >
                            {lecture.title}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default LecturesList;
