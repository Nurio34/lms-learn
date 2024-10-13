import { createContext, useContext } from "react";
import { CourseType } from "../../../types/course";
import useCourses from "./hooks/useCourses";
import useFilter, { FilterType } from "./hooks/useFilter";
import useSort, { SortType } from "./hooks/useSort";

type StudentContextType = {
    isLoading: boolean;
    courses: CourseType[];
    error: string;
    filter: FilterType;
    setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
    filteredCourses: CourseType[];
    setFilteredCourses: React.Dispatch<React.SetStateAction<CourseType[]>>;
    sort: SortType;
    setSort: React.Dispatch<React.SetStateAction<SortType>>;
};

const StudentContext = createContext({} as StudentContextType);

function StudentProvider({ children }: { children: React.ReactNode }) {
    const { isLoading, courses, error } = useCourses();
    const { filter, setFilter, filteredCourses, setFilteredCourses } =
        useFilter(courses);
    const { sort, setSort } = useSort(setFilteredCourses);

    return (
        <StudentContext.Provider
            value={{
                isLoading,
                courses,
                error,
                filter,
                setFilter,
                filteredCourses,
                setFilteredCourses,
                sort,
                setSort,
            }}
        >
            {children}
        </StudentContext.Provider>
    );
}

export default StudentProvider;

export const useStudentContext = () => useContext(StudentContext);
