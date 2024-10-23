import { useEffect } from "react";
import axiosInstance from "../../../../../services/axios";
import { useStudentContext } from "../../Context";
import { AxiosError } from "axios";
import { myCoursesType } from "../../Context/hooks/useMyCourses";

function MyCoursesPage() {
    const {
        isLoadingMyCourses,
        setIsLoadingMyCourses,
        myCourses,
        setMyCourses,
        errorMyCourses,
        setErrorMyCourses,
    } = useStudentContext();

    const resetStatesOnInitialRender = () => {
        setIsLoadingMyCourses(false);
        setMyCourses([] as myCoursesType);
        setErrorMyCourses("");
    };

    const fetchMyCourses = async () => {
        setIsLoadingMyCourses(true);

        try {
            const response = await axiosInstance("/my-courses/fetch-courses");
            console.log(response.data.data);

            if (response.data.success) {
                setMyCourses(response.data.data);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorMyCourses(error.response?.data.message);
            }
        } finally {
            setIsLoadingMyCourses(false);
        }
    };

    useEffect(() => {
        resetStatesOnInitialRender();
        fetchMyCourses();
    }, []);

    if (isLoadingMyCourses) {
        return <p>Loading ...</p>;
    }
    if (errorMyCourses) {
        return <p>{errorMyCourses}</p>;
    }

    return <div>MyCoursesPage</div>;
}

export default MyCoursesPage;
