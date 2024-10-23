import { useState } from "react";

export type myCourseType = {
    courseId: String;
    title: String;
    instructerName: String;
    purchaseDate: String;
    courseImage: String;
};

export type myCoursesType = myCourseType[];

const useMyCourses = () => {
    const [isLoadingMyCourses, setIsLoadingMyCourses] = useState(false);
    const [myCourses, setMyCourses] = useState<myCoursesType>(
        [] as myCoursesType,
    );
    const [errorMyCourses, setErrorMyCourses] = useState("");

    return {
        isLoadingMyCourses,
        setIsLoadingMyCourses,
        myCourses,
        setMyCourses,
        errorMyCourses,
        setErrorMyCourses,
    };
};

export default useMyCourses;
