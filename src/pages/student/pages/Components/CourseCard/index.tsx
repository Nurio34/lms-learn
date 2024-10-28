import { Link } from "react-router-dom";
import { CourseType } from "../../../../../types/course";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../../../../GlobalContext";

type CourseCardType = {
    course: CourseType;
};

function CourseCard({ course }: CourseCardType) {
    const { isSmallScreen } = useGlobalContext();

    return (
        <motion.li
            className="rounded-xl overflow-hidden shadow-lg border-2 aspect-square"
            layout
        >
            <Link to={`/student/courses/${course._id}`}>
                <div className=" relative w-full h-full md:h-auto ">
                    <img
                        src={course.image.imageUrl}
                        alt={`${course.title} image`}
                        className="absolute top-0 left-0 w-full h-full md:h-auto md:relative"
                    />
                </div>
            </Link>
            {!isSmallScreen && (
                <div className="p-3">
                    <h3 className=" font-semibold text-xl">{course.title}</h3>
                    <p className="truncate">{course.description}</p>
                    <div className="flex justify-between items-center self-end">
                        <div className="flex items-center">
                            <span>$</span>
                            <p className=" font-semibold">{course.pricing}</p>
                        </div>
                        <div className="flex gap-1 items-center">
                            <span>by</span>
                            <Link
                                to={`/student/instrcter/${course.instructerId}`}
                                className=" font-semibold text-lg underline underline-offset-2"
                            >
                                {course.instructerName}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </motion.li>
    );
}

export default CourseCard;
