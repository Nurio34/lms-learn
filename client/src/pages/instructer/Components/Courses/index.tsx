import CreateNewCourseButton from "./CreateNewCourseButton";
import Table from "./Table";

function Courses() {
    return (
        <section className=" my-8 mx-16 bg-white py-3 px-6 rounded-l">
            <div className=" flex justify-between items-center border-b-2 border-gray-200 shadow-md pb-3">
                <h1 className="text-2xl font-bold">All Courses</h1>
                <CreateNewCourseButton />
            </div>
            <Table />
        </section>
    );
}

export default Courses;
