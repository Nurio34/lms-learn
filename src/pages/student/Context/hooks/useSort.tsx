import { useEffect, useState } from "react";
import { CourseType } from "../../../../types/course";

export type SortType =
    | ""
    | "price-lowtohigh"
    | "price-hightolow"
    | "title-atoz"
    | "title-ztoa"
    | "reset";

const useSort = (
    setFilteredCourses: React.Dispatch<React.SetStateAction<CourseType[]>>,
) => {
    const [sort, setSort] = useState<SortType>("");

    useEffect(() => {
        if (sort === "price-hightolow") {
            setFilteredCourses((prev) =>
                [...prev].sort((a, b) => +b.pricing - +a.pricing),
            );
        } else if (sort === "price-lowtohigh") {
            setFilteredCourses((prev) =>
                [...prev].sort((a, b) => +a.pricing - +b.pricing),
            );
        } else if (sort === "title-atoz") {
            setFilteredCourses((prev) =>
                [...prev].sort((a, b) => a.title.localeCompare(b.title)),
            );
        } else if (sort === "title-ztoa") {
            setFilteredCourses((prev) =>
                [...prev].sort((a, b) => b.title.localeCompare(a.title)),
            );
        } else {
            setFilteredCourses((prev) =>
                [...prev].sort(
                    (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime(),
                ),
            );
        }
    }, [sort]);

    return { sort, setSort };
};

export default useSort;
