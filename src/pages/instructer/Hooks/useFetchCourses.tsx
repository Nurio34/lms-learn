import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../../../services/axios";
import { AxiosError } from "axios";
import { CourseType } from "../../../types/course";

const useFetchCourses = (isEditing: boolean) => {
    const [courses, setCourses] = useState<CourseType[]>([] as CourseType[]);

    const location = useLocation();

    const fetchCourses = async () => {
        try {
            const response = await axiosInstance.get(`/course/get-courses`);
            setCourses(response.data.courses);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
            }
            console.log(error);
        }
    };

    useEffect(() => {
        if (location.pathname.includes("instructer")) {
            if (!isEditing) {
                fetchCourses();
            }
        }
    }, [location.pathname, isEditing]);

    return { courses, setCourses };
};

export default useFetchCourses;
