import { IoIosSchool } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./Components/LogoutButton";
import ExploreCoursesButton from "./Components/ExploreCoursesButton";
import MyCoursesButton from "./Components/MyCoursesButton";
import { useGlobalContext } from "../../GlobalContext";
import { useEffect, useRef } from "react";

function index() {
    const location = useLocation();
    const isStudentView = location.pathname.includes("student");

    const { setHeaderHeight } = useGlobalContext();

    const HeaderElement = useRef<HTMLHeadElement | null>(null);

    useEffect(() => {
        if (HeaderElement.current) {
            setHeaderHeight(
                HeaderElement.current.getBoundingClientRect().height,
            );
        }
    }, []);

    return (
        <header
            ref={HeaderElement}
            className=" border-b-2 flex justify-between items-center"
        >
            <Link to="/" className="flex items-center gap-3">
                <IoIosSchool className=" text-6xl" />
                <p className=" font-bold text-3xl">LMS School</p>
            </Link>
            {isStudentView && <ExploreCoursesButton />}
            {isStudentView && <MyCoursesButton />}
            <LogoutButton />
        </header>
    );
}

export default index;
