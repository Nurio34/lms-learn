import { useStudentContext } from "../../Context";
import CourseCard from "../Components/CourseCard";
import Filters from "./Components/Filters";

function StudentCoursesPage() {
    const { isLoading, error, filteredCourses } = useStudentContext();

    return (
        <div className="flex gap-3 py-3">
            <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 grow ">
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
            </ul>
            <Filters />
        </div>
    );
}

export default StudentCoursesPage;
