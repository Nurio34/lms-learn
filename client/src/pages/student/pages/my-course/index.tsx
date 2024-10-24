import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../../../services/axios";
import { useEffect, useState } from "react";
import { myCourseType } from "../../Context/hooks/useMyCourses";
import { AxiosError } from "axios";

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

function MyCoursePage() {
    const { courseId } = useParams();

    const [myCourse, setMyCourse] = useState<myCourseType>({} as myCourseType);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [progress, setMyCoursesetProgress] = useState<ProgressType>(
        {} as ProgressType,
    );

    const navigate = useNavigate();

    const resetStatesOnInitialRender = () => {
        setIsLoading(false);
        setMyCourse({} as myCourseType);
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
            setMyCoursesetProgress(response.data.progress);
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

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return <div>MyCoursePage</div>;
}

export default MyCoursePage;
