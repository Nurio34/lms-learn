import { MdOndemandVideo } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../../GlobalContext";

function MyCoursesButton() {
    const { isSmallScreen } = useGlobalContext();

    return (
        <Link
            to={"/student/my-courses"}
            className="c-btn bg-[green] hover:bg-green-500 text-white min-w-max
                flex items-center gap-3
            "
        >
            {!isSmallScreen && " My Courses"}
            <MdOndemandVideo size={isSmallScreen ? 24 : 28} />
        </Link>
    );
}

export default MyCoursesButton;
