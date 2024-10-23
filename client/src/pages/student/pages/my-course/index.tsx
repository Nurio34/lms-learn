import { useParams } from "react-router-dom";
import axiosInstance from "../../../../../services/axios";
import { useEffect } from "react";

function MyCoursePage() {
    const { courseId } = useParams();

    const fetchMyCourse = async () => {
        const response = await axiosInstance(`course/get-course/${courseId}`);
        console.log(response);
    };

    useEffect(() => {
        fetchMyCourse();
        //! Here i am !
    });

    return <div>MyCoursePage</div>;
}

export default MyCoursePage;
