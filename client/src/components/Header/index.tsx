import { IoIosSchool } from "react-icons/io";
import { Link } from "react-router-dom";
import LogoutButton from "./Components/LogoutButton";

function index() {
    return (
        <header className=" border-b-2 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
                <IoIosSchool className=" text-6xl" />
                <p className=" font-bold text-3xl">LMS School</p>
            </Link>
            <LogoutButton />
        </header>
    );
}

export default index;
