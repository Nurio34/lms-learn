import { MdOndemandVideo } from "react-icons/md";
import { Link } from "react-router-dom";

function MyCoursesButton() {
    return (
        <Link
            to={"/student/my-courses"}
            className="c-btn bg-[green] hover:bg-green-500 text-white
                flex items-center gap-3
            "
        >
            My Courses
            <MdOndemandVideo size={28} />
        </Link>
    );
}

export default MyCoursesButton;
