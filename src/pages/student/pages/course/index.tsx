import { useNavigate, useParams } from "react-router-dom";
import { useStudentContext } from "../../Context";
import { FaGlobe, FaLock, FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import VideoPlayer from "../../../../components/ReactPlayer";
import { useEffect, useState } from "react";
import { LectureType } from "../../../../types/course";
import PurchaseButton from "./Components/PurchaseButton";
import PurchaseForm from "./Components/PurchaseForm";
import { SiTicktick } from "react-icons/si";
import { useGlobalContext } from "../../../../GlobalContext";

function StudentCoursePage() {
  const { user } = useGlobalContext();

  const { courseId } = useParams();

  //! *** IF STUDENT ALREADY BOUGHT THIS COURSE, REDIRECT TO MY-COURSE PAGE ***
  const [isCourseAlreadyBought, setIsCourseAlreadyBought] = useState(true);
  const navigate = useNavigate();

  const { filteredCourses } = useStudentContext();

  const course = filteredCourses.filter((c) => c._id === courseId)[0];

  const checkIfThisCourseAlreadyBought = async () => {
    if (course?.students?.some((student) => student.id === user.id)) {
      navigate(`/student/my-courses/${courseId}`);
      return;
    } else {
      setIsCourseAlreadyBought(false);
    }
  };

  useEffect(() => {
    checkIfThisCourseAlreadyBought();
  }, []);

  //! *************************************************************************

  const [currentLecture, setCurrentLecture] = useState<LectureType>(
    {} as LectureType
  );

  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);

  useEffect(() => {
    if (course) {
      setCurrentLecture(course.lectures[0]);
    }
  }, [course]);

  if (!course) {
    return <div>Loading the Course ...</div>;
  }

  return (
    <>
      {!isCourseAlreadyBought && (
        <main className=" space-y-10">
          <header className="bg-primary/30  py-[2vh] px-[2vw] rounded-lg space-y-1">
            <hgroup className=" space-y-1">
              <h1 className=" font-bold text-2xl">{course.title}</h1>
              <h2 className=" font-semibold text-xl px-3">
                {course.description}
              </h2>
            </hgroup>

            <div className=" md:flex gap-12 text-lg px-6">
              <p>
                Released at {new Date(course.createdAt).toLocaleDateString()}
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
          <div className="space-y-[2vh] lg:space-y-0 lg:flex items-start gap-10 ">
            <div className=" space-y-10 grow">
              <section className=" space-y-3 bg-secondary/30 py-[2vh] px-[2vw] rounded-lg">
                <h2 className=" text-xl font-semibold">What you will learn</h2>
                <ul className=" grid gap-3 px-3">
                  {course.objectives.split("-").map((item, index) => {
                    if (index !== 0) {
                      return (
                        <li key={index} className="flex gap-1 items-center">
                          <span className="  rounded-full p-1">
                            <SiTicktick
                              color="rgb(0,255,0)"
                              className="contrast-100"
                            />
                          </span>
                          <p>{item}</p>
                        </li>
                      );
                    }
                  })}
                </ul>
              </section>
              <section className=" bg-accent/30 py-[2vh] px-[2vw] rounded-lg space-y-3 py-4">
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
                          {lecture.freePreview ? <FaPlayCircle /> : <FaLock />}
                        </span>
                        <p>{lecture.title}</p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
            {isPaymentFormOpen ? (
              <PurchaseForm
                course={course}
                setIsPaymentFormOpen={setIsPaymentFormOpen}
              />
            ) : (
              <div className="py-3 px-6 bg-black rounded-lg grid gap-3 ">
                <div className=" md:w-[452px]">
                  <VideoPlayer lecture={currentLecture} />
                </div>
                <PurchaseButton setIsPaymentFormOpen={setIsPaymentFormOpen} />
              </div>
            )}
          </div>
        </main>
      )}
    </>
  );
}

export default StudentCoursePage;
