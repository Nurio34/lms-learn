import { useInstructerContext } from "../../../InstructerContext";
import ActionButtons from "./Components/ActionButtons";

function Table() {
    const { courses } = useInstructerContext();

    const titles = ["course", , "revenue", "students", "actions"];

    return (
        <div className="py-3 space-y-3">
            <div className="grid grid-cols-4 justify-items-center items-center border-b-2 shadow-sm">
                {titles.map((title, ind) => (
                    <p key={ind} className="capitalize">
                        {title}
                    </p>
                ))}
            </div>

            {courses.map((course, index) => (
                <div
                    key={index}
                    className="grid grid-cols-4 justify-items-center items-center"
                >
                    <p className="capitalize">{course.title}</p>
                    <p className="capitalize">
                        {course.students.length * +course.pricing}
                    </p>
                    <p className="capitalize">{course.students.length}</p>
                    <ActionButtons courseId={course._id} />
                </div>
            ))}
        </div>
    );
}

export default Table;
