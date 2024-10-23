import { Link } from "react-router-dom";

function ExploreCoursesButton() {
    return (
        <Link
            to={"/student/courses"}
            className="c-btn bg-[purple] hover:bg-purple-500 text-white"
        >
            Explore Courses
        </Link>
    );
}

export default ExploreCoursesButton;
