import { FaWpexplorer } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../../GlobalContext";

function ExploreCoursesButton() {
    const { isSmallScreen } = useGlobalContext();

    return (
        <Link
            to={"/student/courses"}
            className="c-btn bg-[purple] hover:bg-purple-500 text-white min-w-max"
        >
            {isSmallScreen ? <FaWpexplorer size={24} /> : "Explore Courses"}
        </Link>
    );
}

export default ExploreCoursesButton;
