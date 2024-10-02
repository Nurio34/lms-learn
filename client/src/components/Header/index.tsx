import { IoIosSchool } from "react-icons/io";
import { Link } from "react-router-dom";

function index() {
    return (
        <header className=" border-b-2 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
                <IoIosSchool className=" text-6xl" />
                <p className=" font-bold text-2xl">LMS School</p>
            </Link>
            <Link
                to={"/auth"}
                type="button"
                className=" bg-green-500 py-1 px-4 rounded-md text-white transition-all
                        hover:bg-green-400 hover:font-semibold hover:scale-110
                    "
            >
                Login
            </Link>
        </header>
    );
}

export default index;
