import { useStudentContext } from "../../../../Context";
import CourseCard from "../../../Components/CourseCard";

function FeauteredCourses() {
    const { isLoading, courses, error } = useStudentContext();

    return (
        <div className=" space-y-6 pt-[2vh] md:pt-0">
            <h2
                className="font-bold text-3xl"
                style={{ fontVariant: "small-caps" }}
            >
                Feautered Courses
            </h2>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-start gap-6">
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
