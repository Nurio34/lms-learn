import { Link } from "react-router-dom";
import { CourseType } from "../../../../../types/course";

type CourseCardType = {
    course: CourseType;
};

function CourseCard({ course }: CourseCardType) {
    return (
        <li className="rounded-xl overflow-hidden shadow-lg border-2">
            <Link to={"course"}>
                <img
                    src={course.image.imageUrl}
                    alt={`${course.title} image`}
                    className="w-full"
                />
            </Link>
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
                            to={"instructer"}
                            className=" font-semibold text-lg underline underline-offset-2"
                        >
                            {course.instructerName}
                        </Link>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default CourseCard;
