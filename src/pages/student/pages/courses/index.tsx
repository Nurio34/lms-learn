import { AnimatePresence } from "framer-motion";
import { useStudentContext } from "../../Context";
import CourseCard from "../Components/CourseCard";
import Filters from "./Components/Filters";

function StudentCoursesPage() {
    const { isLoading, error, filteredCourses } = useStudentContext();

    return (
        <div className="flex gap-3 py-3">
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-start gap-6 grow ">
                <AnimatePresence>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : error.trim() !== "" ? (
                        error
                    ) : (
                        filteredCourses &&
                        filteredCourses.map((course) => (
                            <CourseCard key={course._id} course={course} />
                        ))
                    )}
                </AnimatePresence>
            </ul>
            <Filters />
        </div>
    );
}

export default StudentCoursesPage;
