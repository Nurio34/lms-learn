import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../../../../../../GlobalContext";
import { IoArrowBackCircleOutline } from "react-icons/io5";

function BackToMyCoursesButton() {
    const { isSmallScreen } = useGlobalContext();

    const navigate = useNavigate();

    const goToMyCourses = () => {
        navigate("/student/my-courses");
    };

    return (
        <button
            type="button"
            className="c-btn bg-[red] hover:bg-red-500 text-white"
            onClick={goToMyCourses}
            aria-label={isSmallScreen ? "Back To My Courses" : ""}
        >
            {isSmallScreen ? (
                <IoArrowBackCircleOutline size={24} />
            ) : (
                "Back To My Courses"
            )}
        </button>
    );
}

export default BackToMyCoursesButton;
