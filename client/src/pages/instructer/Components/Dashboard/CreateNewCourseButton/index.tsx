import { useInstructerContext } from "../../../InstructerContext";
import CreateNewCourse from "../CreateNewCourse";

function CreateNewCourseButton() {
    const { setActiveTab, setActiveComponent } = useInstructerContext();

    return (
        <button
            type="button"
            className=" bg-orange-400 text-white font-semibold py-1 px-3 rounded-md transition-all
                hover:scale-105 active:scale-95 hover:bg-orange-300    
            "
            onClick={() => {
                setActiveTab("createNewCourse");
                setActiveComponent(<CreateNewCourse />);
            }}
        >
            Create New Course
        </button>
    );
}

export default CreateNewCourseButton;
