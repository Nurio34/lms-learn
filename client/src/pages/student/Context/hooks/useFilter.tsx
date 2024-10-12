import { useEffect, useState } from "react";
import { CourseType } from "../../../../types/course";

export type FilterType = {
    category: string[];
    level: string[];
    primaryLanguage: string[];
};

export const initialFilter = {
    category: [],
    level: [],
    primaryLanguage: [],
};

const useFilter = (courses: CourseType[]) => {
    const [filter, setFilter] = useState<FilterType>(() => {
        const localFilter = localStorage.getItem("filter");

        if (!localFilter) {
            return initialFilter;
        } else {
            return JSON.parse(localFilter);
        }
    });
    const [filteredCourses, setFilteredCourses] =
        useState<CourseType[]>(courses);

    const isFiltered = Object.values(filter).some((val) => val.length > 0);

    useEffect(() => {
        if (!isFiltered) {
            setFilteredCourses(courses);
        } else {
            setFilteredCourses(
                courses
                    .filter((course) =>
                        filter.category.length > 0
                            ? filter.category.includes(course.category)
                            : course,
                    )
                    .filter((course) =>
                        filter.level.length > 0
                            ? filter.level.includes(course.level)
                            : course,
                    )
                    .filter((course) =>
                        filter.primaryLanguage.length > 0
                            ? filter.primaryLanguage.includes(
                                  course.primaryLanguage,
                              )
                            : course,
                    ),
            );
        }
    }, [filter, courses]);

    useEffect(() => {
        localStorage.setItem("filter", JSON.stringify(filter));
    }, [filter]);

    return { filter, setFilter, filteredCourses, setFilteredCourses };
};

export default useFilter;
