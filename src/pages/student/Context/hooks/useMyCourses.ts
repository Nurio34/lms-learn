import { useState } from "react";

export type myCourseType = {
    courseId: string;
    title: string;
    instructerName: string;
    purchaseDate: string;
    courseImage: string;
};

export type myCoursesType = myCourseType[];

const useMyCourses = () => {
    const [myCourses, setMyCourses] = useState<myCoursesType>(
        [] as myCoursesType,
    );

    return {
        myCourses,
        setMyCourses,
    };
};

export default useMyCourses;
