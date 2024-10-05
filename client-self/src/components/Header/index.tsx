import { IoIosSchool } from "react-icons/io";
import LogoutButton from "./Components/LogoutButton";

function Header() {
    return (
        <header className="flex  justify-between items-center border-b-2 shadow-md">
            <div className=" flex items-center gap-3 ">
                <IoIosSchool className=" text-6xl" />
                <p className=" text-2xl font-semibold font-serif">LMS-Learn</p>
            </div>
            <LogoutButton />
        </header>
    );
}

export default Header;
