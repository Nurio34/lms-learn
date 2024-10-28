import { useNavigate } from "react-router-dom";

function BackToMyCoursesButton() {
    const navigate = useNavigate();

    const goToMyCourses = () => {
        navigate("/student/my-courses");
    };

    return (
        <button
            type="button"
            className="c-btn bg-[red] hover:bg-red-500 text-white"
            onClick={goToMyCourses}
        >
            Back To My Courses
        </button>
    );
}

export default BackToMyCoursesButton;
