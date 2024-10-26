import { useProgressContext } from "../../../../../../Context";

function ProgressIndicator() {
    const { progress } = useProgressContext();

    return (
        <ul className=" py-1 px-3 space-y-3">
            {progress?.lectureProgress?.map((lecture, index) => {
                return (
                    <li
                        key={lecture.lectureId}
                        className={`min-w-10 aspect-square rounded-full relative grid place-content-center transition-all
                            ${lecture.viewed ? "bg-green-500" : "bg-red-500"}
                        `}
                    >
                        <div className="w-11/12 aspect-square rounded-full bg-white text-black  grid place-content-center">
                            {index + 1}
                        </div>
                        {index < progress.lectureProgress.length - 1 && (
                            <div
                                className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full min-h-6 w-1 transition-all
                                ${
                                    lecture.viewed
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                }    
                            `}
                            ></div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

export default ProgressIndicator;
