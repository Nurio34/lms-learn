import { IoIosSchool } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./Components/LogoutButton";
import ExploreCoursesButton from "./Components/ExploreCoursesButton";
import MyCoursesButton from "./Components/MyCoursesButton";
import { useGlobalContext } from "../../GlobalContext";
import { useEffect, useRef } from "react";
import ProfilePictureButton from "./Components/ProfilePictureButton";

function index() {
    const location = useLocation();
    const isStudentView = location.pathname.includes("student");
    const isAuthPage = location.pathname.includes("auth");

    const { setHeaderHeight, isSmallScreen } = useGlobalContext();

    const HeaderElement = useRef<HTMLHeadElement | null>(null);

    useEffect(() => {
        if (HeaderElement.current) {
            setHeaderHeight(
                HeaderElement.current.getBoundingClientRect().height,
            );
        }
    }, []);

    //! *** İF STUDENT İS İN PROGRESS PAGE, DON'T SHOW HEADER ***
    const isInProgressPage =
        location.pathname.includes("/student/my-courses/") &&
        location.pathname.split("/").filter((path) => path.trim() !== "")
            .length === 3;
    //! *********************************************************

    return (
        <>
            {!isInProgressPage && (
                <header
                    ref={HeaderElement}
                    className=" border-b-2 flex gap-[6vw] md:gap-[20vw] items-center"
                >
                    <Link to="/auth" className="flex items-center gap-3">
                        <IoIosSchool className=" text-6xl" />
                        {!isSmallScreen && (
                            <p className=" font-bold text-3xl">LMS School</p>
                        )}
                    </Link>
                    <div className=" flex justify-between items-center grow gap-[6vw]">
                        {isStudentView && <ExploreCoursesButton />}
                        {isStudentView && <MyCoursesButton />}
                        {!isAuthPage && (
                            <div className="flex gap-[6vw] md:gap-3 items-center">
                                <ProfilePictureButton />
                                <LogoutButton />
                            </div>
                        )}
                    </div>
                </header>
            )}
        </>
    );
}

export default index;
