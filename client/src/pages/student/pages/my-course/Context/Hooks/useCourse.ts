import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../../../services/axios";
import { CourseType, LectureType } from "../../../../../../types/course";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../../../../../GlobalContext";

type LectureProgressType = {
    lectureId: string;
    viewed: boolean;
    viewedDate: Date;
};

export type ProgressType = {
    studentId: string;
    courseId: string;
    complated: boolean;
    complationDate: Date;
    lectureProgress: LectureProgressType[];
    isCourseComplatedOnce: boolean;
    playingLecture: number;
};

const useCourse = () => {
    const { courseId } = useParams();

    const { isVideoComplated, setIsVideoComplated } = useGlobalContext();

    const [myCourse, setMyCourse] = useState<CourseType>({} as CourseType);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [progress, setMyCourseProgress] = useState<ProgressType>(
        {} as ProgressType,
    );
    const [playingLecture, setPlayingLecture] = useState<
        LectureType | undefined
    >({} as LectureType);
    const [isLastVideo, setIsLastVideo] = useState(false);
    const [isCourseComplated, setIsCourseComplated] = useState(false);

    //! *** INITIAL COURSE and PROGRESS DATA DOWNLOAD ***
    const navigate = useNavigate();

    const resetStatesOnInitialRender = () => {
        setIsLoading(false);
        setMyCourse({} as CourseType);
        setMyCourseProgress({} as ProgressType);
        setError("");
    };

    const fetchMyCourse = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance(
                `my-courses/fetch-course/${courseId}`,
            );

            if (!response.data.isThisCourseBought) {
                navigate(`/student/courses/${courseId}`);
                return;
            }

            setMyCourse(response.data.course);
            setMyCourseProgress(response.data.progress);
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        resetStatesOnInitialRender();
        fetchMyCourse();
    }, []);
    //! ***************************************************

    //! *** SET THE "PLAYING VIDEO" ON INITIAL RENDER ***
    useEffect(() => {
        if (myCourse._id && progress.studentId) {
            if (!progress.isCourseComplatedOnce) {
                const TheFirstUncomplatedLectureId =
                    progress.lectureProgress.filter((item) => !item.viewed)[0]
                        .lectureId;

                setPlayingLecture(
                    myCourse.lectures.find(
                        (lecture) =>
                            lecture._id === TheFirstUncomplatedLectureId,
                    ),
                );

                setIsLastVideo(
                    TheFirstUncomplatedLectureId ===
                        progress.lectureProgress[
                            progress.lectureProgress.length - 1
                        ].lectureId,
                );
            } else {
                const lecture = myCourse.lectures[progress.playingLecture | 0];
                setPlayingLecture(lecture);
            }
        }
    }, [myCourse, progress]);
    //! ************************************************

    //! *** WHEN CURRENT VİDEO IS COMPLATED, "UPDATE" THE PROGRESS DATA ***
    const updateProgress = async () => {
        try {
            const response = await axiosInstance.post(
                `/my-courses/update-progress/${myCourse._id}`,
                { lectureId: playingLecture?._id },
            );

            toast.success(response.data.message);
            setMyCourseProgress(response.data.progress);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    };

    useEffect(() => {
        if (isVideoComplated) {
            if (!isLastVideo && !isCourseComplated) {
                updateProgress();
            } else {
                setIsCourseComplated(true);
            }
            setIsVideoComplated(false);
        }
    }, [isVideoComplated]);
    //! *****************************************************************

    // //! *** "RESET" PROGRESS as "isCourseComplatedOnce = true" ***
    const resetProgress = async () => {
        try {
            const response = await axiosInstance.get(
                `/my-courses/reset-progress/${myCourse._id}`,
            );

            toast.success(response.data.message);
            setMyCourseProgress(response.data.progress);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    };

    // //! ********************************************

    //! *** WHEN CLİCK ON A LECTURE, SET "playingLecture" PROP IN DATABASE ***
    const updatePlayingLecture = async (index: number) => {
        try {
            const response = await axiosInstance(
                `/my-courses/update-playingLecture/${myCourse._id}/${index}`,
            );
            setMyCourseProgress(response.data.progress);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    //! **********************************************************************

    return {
        isLoading,
        error,
        myCourse,
        progress,
        setMyCourseProgress,
        playingLecture,
        setPlayingLecture,
        isLastVideo,
        setIsLastVideo,
        isCourseComplated,
        setIsCourseComplated,
        resetProgress,
        updatePlayingLecture,
    };
};

export default useCourse;
