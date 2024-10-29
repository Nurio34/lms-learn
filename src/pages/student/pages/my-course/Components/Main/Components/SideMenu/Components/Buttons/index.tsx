import { useNavigate } from "react-router-dom";
import LogoutButton from "../../../../../../../../../../components/Header/Components/LogoutButton";
import { useGlobalContext } from "../../../../../../../../../../GlobalContext";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineOndemandVideo } from "react-icons/md";

function Buttons() {
    const { isSmallScreen } = useGlobalContext();
    const navigate = useNavigate();

    return (
        <div className="py-3 px-3 md:space-y-3 flex md:block items-center gap-3">
            <button
                type="button"
                className="c-btn bg-primary text-white w-full"
                onClick={() => navigate("/student")}
            >
                {isSmallScreen ? <IoHomeOutline size={24} /> : "Homepage"}
            </button>
            <button
                type="button"
                className="c-btn bg-secondary text-white w-full"
                onClick={() => navigate("/student/courses")}
            >
                {isSmallScreen ? (
                    <MdOutlineOndemandVideo size={24} />
                ) : (
                    "Courses"
                )}
            </button>
            <LogoutButton />
        </div>
    );
}

export default Buttons;
