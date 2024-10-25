import { useEffect, useState } from "react";
import VideoPlayer from "../../../../../../../../components/ReactPlayer";
import { useGlobalContext } from "../../../../../../../../GlobalContext";
import { useProgressContext } from "../../../../Context";
import axiosInstance from "../../../../../../../../../services/axios";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { LectureType } from "../../../../../../../../types/course";

function VideoSection() {
    const { isVideoComplated, setIsVideoComplated } = useGlobalContext();
    const { isLoading, error, myCourse, progress, setMyCourseProgress } =
        useProgressContext();
    const [playingLecture, setPlayingLecture] = useState<
        LectureType | undefined
    >({} as LectureType);

    console.log(playingLecture);

    //! *** SET THE PLAYING VIDEO ON INITIAL RENDER ***
    useEffect(() => {
        const TheFirstUncomplatedLectureId = progress?.lectureProgress?.filter(
            (item) => !item.viewed,
        )[0]?.lectureId;

        if (!TheFirstUncomplatedLectureId) {
            console.log("CourseComplated");
            if (myCourse._id) {
                setPlayingLecture(myCourse?.lectures[0]);
            }
        } else {
            if (myCourse._id) {
                setPlayingLecture(
                    myCourse?.lectures?.find(
                        (lecture) =>
                            lecture._id === TheFirstUncomplatedLectureId,
                    ),
                );
            }
        }
    }, [progress]);
    //! ************************************************

    //! *** WHEN CURRENT VİDEO IS COMPLATED, UPDATE THE PROGRESS DATA ***

    const updateProgress = async () => {
        console.log("Updating progress ...");
        try {
            const response = await axiosInstance.post(
                `/my-courses/update-progress/${myCourse._id}`,
                { lectureId: playingLecture?._id },
            );
            toast.success(response.data.message);
            setMyCourseProgress(response.data.progress);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message);
                toast.error(error.response?.data.message);
            }
        }
    };

    useEffect(() => {
        if (isVideoComplated) {
            updateProgress();
            setIsVideoComplated(false);
        }
    }, [isVideoComplated]);
    //! *****************************************************************

    if (isLoading || !myCourse._id) return <p>Loading ... Please wait !</p>;

    if (error) return <p>{error}</p>;
    if (myCourse._id)
        return (
            <section className="grow">
                <div className=" px-[8vw] pt-[4vh]">
                    <VideoPlayer lecture={playingLecture!} />
                    <p className="c-subtitle">{playingLecture?.title}</p>
                </div>
            </section>
        );
}

export default VideoSection;
