import { useEffect, useState } from "react";
import axiosInstance from "../../../../../services/axios";
import { CourseType } from "../../../../types/course";
import { AxiosError } from "axios";
import { UserType } from "../../../../GlobalContext";

const useCourses = (user: UserType) => {
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
        if (user.id) {
            fetchAllCourses();
        }
    }, [user]);

    return { isLoading, courses, error, setCourses };
};

export default useCourses;
