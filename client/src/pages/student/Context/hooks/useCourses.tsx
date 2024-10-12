import { useEffect, useState } from "react";
import axiosInstance from "../../../../../services/axios";
import { CourseType } from "../../../../types/course";
import { AxiosError } from "axios";

const useCourses = () => {
    const [courses, setCourses] = useState<CourseType[]>([] as CourseType[]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchAllCourses = async () => {
        setIsLoading(true);

        try {
            const response = await axiosInstance("/course/get-all-courses");

            setCourses(response.data.courses);
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (courses.length === 0) {
            fetchAllCourses();
        }
    }, []);

    return { isLoading, courses, error, setCourses };
};

export default useCourses;
