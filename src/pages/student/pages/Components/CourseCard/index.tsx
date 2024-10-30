import { Link } from "react-router-dom";
import { CourseType } from "../../../../../types/course";
import { motion } from "framer-motion";

type CourseCardType = {
    course: CourseType;
};

function CourseCard({ course }: CourseCardType) {
    return (
        <motion.li
            className="md:rounded-xl overflow-hidden shadow-lg border-2 md:aspect-square "
            layout
        >
            <Link to={`/student/courses/${course._id}`}>
                <div className=" relative w-full md:h-auto ">
                    <img
                        src={course.image.imageUrl}
                        alt={`${course.title} image`}
                        className="  w-full  md:h-auto "
                    />
                </div>
            </Link>

            <div className="p-3 bg-white">
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
        </motion.li>
    );
}

export default CourseCard;
