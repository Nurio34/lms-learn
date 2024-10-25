import { useEffect, useRef } from "react";
import BackToMyCoursesButton from "./Components/BackToMyCoursesButton";
import CourseTitle from "./Components/CourseTitle";
import MenuToggleButton from "./Components/MenuToggleButton";
import { useProgressContext } from "../../Context";

function Header() {
    const { getHeaderHeight } = useProgressContext();

    const HeaderElement = useRef<HTMLHeadElement | null>(null);

    useEffect(() => {
        if (HeaderElement.current) {
            const height = HeaderElement.current.getBoundingClientRect().height;
            getHeaderHeight(height);
        }
    }, []);

    return (
        <header
            ref={HeaderElement}
            className="flex items-center gap-6 justify-start shadow-lg py-1 px-3"
        >
            <BackToMyCoursesButton />
            <CourseTitle />
            <MenuToggleButton />
        </header>
    );
}

export default Header;
