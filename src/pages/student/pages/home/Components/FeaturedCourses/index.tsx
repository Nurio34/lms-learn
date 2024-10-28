import { useStudentContext } from "../../../../Context";
import CourseCard from "../../../Components/CourseCard";

function FeauteredCourses() {
    const { isLoading, courses, error } = useStudentContext();

    return (
        <div className=" space-y-6">
            <h2
                className="font-bold text-3xl"
                style={{ fontVariant: "small-caps" }}
            >
                Feautered Courses
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 ">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error.trim() !== "" ? (
                    error
                ) : (
                    courses.map((course) => (
                        <CourseCard key={course._id} course={course} />
                    ))
                )}
            </ul>
        </div>
    );
}

export default FeauteredCourses;
