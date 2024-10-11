import { useEffect } from "react";
import axiosInstance from "../../../../../services/axios";
import BackgroundImage from "../../Components/BackgroundImage";
import FeauteredCourses from "./Components/FeaturedCourses";
import Hero from "./Components/Hero";
import { useStudentContext } from "../../Context";

function StudentHomePage() {
    const { setCourses } = useStudentContext();

    const fetchAllCourses = async () => {
        try {
            const response = await axiosInstance("/course/get-all-courses");

            setCourses(response.data.courses);
        } catch (error) {
            setCourses([]);
        }
    };

    useEffect(() => {
        fetchAllCourses();
    }, []);

    return (
        <main>
            <BackgroundImage />
            <Hero />
            <FeauteredCourses />
        </main>
    );
}

export default StudentHomePage;
