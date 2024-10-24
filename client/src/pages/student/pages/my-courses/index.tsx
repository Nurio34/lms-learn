import { useEffect, useState } from "react";
import axiosInstance from "../../../../../services/axios";
import { useStudentContext } from "../../Context";
import { AxiosError } from "axios";
import { myCoursesType } from "../../Context/hooks/useMyCourses";
import { Link } from "react-router-dom";

function MyCoursesPage() {
    const { myCourses, setMyCourses } = useStudentContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const resetStatesOnInitialRender = () => {
        setIsLoading(false);
        setMyCourses([] as myCoursesType);
        setError("");
    };

    const fetchMyCourses = async () => {
        setIsLoading(true);

        try {
            const response = await axiosInstance("/my-courses/fetch-courses");

            if (response.data.success) {
                setMyCourses(response.data.data);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        resetStatesOnInitialRender();
        fetchMyCourses();
    }, []);

    if (isLoading) {
        return <p>Loading ...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <main>
            <h1>My Courses</h1>
            <section>
                <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                    {myCourses.map((course) => {
                        return (
                            <li
                                key={course.courseId}
                                className=" shadow-lg border-2 overflow-hidden rounded-lg transition-all
                                    hover:scale-105 active:scale-95 hover:shadow-2xl
                                "
                            >
                                <Link
                                    to={`/student/my-courses/${course.courseId}`}
                                >
                                    <picture>
                                        <figure>
                                            <img
                                                src={course.courseImage}
                                                alt={`${course.title} image`}
                                                className="w-full"
                                            />
                                        </figure>
                                        <figcaption className=" py-1 px-3">
                                            <div className="flex items-center justify-between">
                                                <p>{course.title}</p>
                                                <div className="flex items-center gap-1">
                                                    <span>by</span>
                                                    <p className=" font-semibold text-lg underline-offset-2 underline">
                                                        {course.instructerName}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-end gap-1 text-end">
                                                <p>Purchased at</p>
                                                <p className=" font-semibold text-lg underline-offset-2 underline">
                                                    {" "}
                                                    {course.purchaseDate
                                                        .split("T")[0]
                                                        .split("-")
                                                        .reduce(
                                                            (
                                                                arr,
                                                                item,
                                                                ind,
                                                            ) => {
                                                                if (ind === 0) {
                                                                    arr[2] =
                                                                        item;
                                                                } else if (
                                                                    ind === 2
                                                                ) {
                                                                    arr[0] =
                                                                        item;
                                                                } else {
                                                                    arr[1] =
                                                                        item;
                                                                }

                                                                return arr;
                                                            },
                                                            ["DD", "MM", "YY"],
                                                        )
                                                        .join("-")}
                                                </p>
                                            </div>
                                        </figcaption>
                                    </picture>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </main>
    );
}

export default MyCoursesPage;
