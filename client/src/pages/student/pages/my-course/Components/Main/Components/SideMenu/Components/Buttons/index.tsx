import { useNavigate } from "react-router-dom";
import LogoutButton from "../../../../../../../../../../components/Header/Components/LogoutButton";

function Buttons() {
    const navigate = useNavigate();

    return (
        <div className="py-3 px-3 space-y-3">
            <button
                type="button"
                className="c-btn bg-primary text-white w-full"
                onClick={() => navigate("/student")}
            >
                Homepage
            </button>
            <button
                type="button"
                className="c-btn bg-secondary text-white w-full"
                onClick={() => navigate("/student/courses")}
            >
                Courses
            </button>
            <LogoutButton />
        </div>
    );
}

export default Buttons;
