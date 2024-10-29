import { useProgressContext } from "../../../../Context";

function CourseTitle() {
    const { isLoading, myCourse } = useProgressContext();

    return (
        <h1
            className={`c-title truncate ${
                isLoading && "min-w-32 min-h-10 bg-gray-100 animate-pulse"
            }`}
        >
            {myCourse.title}
        </h1>
    );
}

export default CourseTitle;
