import { createContext, useContext, useState } from "react";
import { CourseType } from "../../../types/course";

type StudentContextType = {
    courses: CourseType[];
    setCourses: React.Dispatch<React.SetStateAction<CourseType[]>>;
};

const StudentContext = createContext({} as StudentContextType);

function StudentProvider({ children }: { children: React.ReactNode }) {
    const [courses, setCourses] = useState<CourseType[]>([] as CourseType[]);

    return (
        <StudentContext.Provider value={{ courses, setCourses }}>
            {children}
        </StudentContext.Provider>
    );
}

export default StudentProvider;

export const useStudentContext = () => useContext(StudentContext);
