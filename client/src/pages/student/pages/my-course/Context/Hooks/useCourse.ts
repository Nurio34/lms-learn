import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../../../services/axios";
import { CourseType } from "../../../../../../types/course";
import { useNavigate, useParams } from "react-router-dom";

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
};

const useCourse = () => {
    const { courseId } = useParams();

    const [myCourse, setMyCourse] = useState<CourseType>({} as CourseType);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [progress, setMyCourseProgress] = useState<ProgressType>(
        {} as ProgressType,
    );

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

    return { isLoading, error, myCourse, progress, setMyCourseProgress };
};

export default useCourse;
