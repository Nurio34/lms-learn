import { useParams } from "react-router-dom";
import { useStudentContext } from "../../Context";
import { FaGlobe, FaLock, FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineFileDone } from "react-icons/ai";
import VideoPlayer from "../../../../components/ReactPlayer";
import { useEffect, useState } from "react";
import { LectureType } from "../../../../types/course";
import PurchaseButton from "./PurchaseButton";

function StudentCoursePage() {
    const { id } = useParams();

    const { filteredCourses } = useStudentContext();

    const course = filteredCourses.filter((c) => c._id === id)[0];

    const [currentLecture, setCurrentLecture] = useState<LectureType>(
        {} as LectureType,
    );

    useEffect(() => {
        if (course) {
            setCurrentLecture(course.lectures[0]);
        }
    }, [course]);

    if (!course) {
        return <div>Loading the Course ...</div>;
    }

    return (
        <main className=" space-y-10">
            <header className="bg-primary text-primary-content py-6 px-12 rounded-lg space-y-1">
                <hgroup className=" space-y-1">
                    <h1 className=" font-bold text-2xl">{course.title}</h1>
                    <h2 className=" font-semibold text-xl px-3">
                        {course.description}
                    </h2>
                </hgroup>

                <div className=" flex gap-12 text-lg px-6">
                    <p>
                        Released at{" "}
                        {new Date(course.createdAt).toLocaleDateString()}
                    </p>
                    <div className=" flex gap-1 items-center">
                        <p>
                            <FaGlobe size={20} />
                        </p>
                        <p className="capitalize">{course.primaryLanguage}</p>
                    </div>
                    <p>
                        {course.students.length} student
                        {course.students.length > 0 && "s"}
                    </p>
                    <p className=" ml-auto">
                        Created by {"  "}
                        <Link
                            to={`/student/instrcter/${course.instructerId}`}
                            className=" underline underline-offset-2 font-bold text-xl"
                        >
                            {course.instructerName}
                        </Link>
                    </p>
                </div>
            </header>
            <div className=" flex gap-10 ">
                <div className=" space-y-10">
                    <section className=" space-y-3 bg-secondary text-secondary-content py-6 px-12 rounded-lg">
                        <h2 className=" text-xl font-semibold">
                            What you will learn
                        </h2>
                        <ul className=" grid grid-cols-2 gap-3 px-3">
                            {course.objectives.split(".").map((item, index) => {
                                if (
                                    index <
                                    course.objectives.split(".").length - 1
                                ) {
                                    return (
                                        <li
                                            key={index}
                                            className="flex gap-3 items-center"
                                        >
                                            <span className=" bg-green-500 rounded-md p-1">
                                                <AiOutlineFileDone size={26} />
                                            </span>
                                            <p>{item}.</p>
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                    </section>
                    <section className=" bg-accent text-accent-content py-6 px-12 rounded-lg space-y-3">
                        <h2 className=" text-xl font-semibold">Curriculum</h2>
                        <ul className=" px-3">
                            {course.lectures.map((lecture) => {
                                return (
                                    <li
                                        key={lecture.public_id}
                                        className={`flex gap-3 items-center
                                ${
                                    lecture.freePreview
                                        ? "cursor-pointer"
                                        : "cursor-not-allowed"
                                }
                            `}
                                        onClick={() => {
                                            if (lecture.freePreview) {
                                                setCurrentLecture(lecture);
                                            }
                                        }}
                                    >
                                        <span>
                                            {" "}
                                            {lecture.freePreview ? (
                                                <FaPlayCircle />
                                            ) : (
                                                <FaLock />
                                            )}
                                        </span>
                                        <p>{lecture.title}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                </div>
                <div className="py-3 px-6 bg-black rounded-lg grid ">
                    <VideoPlayer lecture={currentLecture} />
                    <PurchaseButton />
                </div>
            </div>
        </main>
    );
}

export default StudentCoursePage;
