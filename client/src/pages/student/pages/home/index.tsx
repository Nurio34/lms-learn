import BackgroundImage from "../../Components/BackgroundImage";
import { useStudentContext } from "../../Context";
import FeauteredCourses from "./Components/FeaturedCourses";
import Hero from "./Components/Hero";

function StudentHomePage() {
    return (
        <main>
            <BackgroundImage />
            <Hero />
            <FeauteredCourses />
        </main>
    );
}

export default StudentHomePage;
