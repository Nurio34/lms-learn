import {
    CurriculumFormInitialData,
    InfoFormInitialFormData,
    SettingsInitialData,
} from "../../../../../config";
import { useInstructerContext } from "../../../InstructerContext";
import CreateNewCourse from "../CreateNewCourse";

function CreateNewCourseButton() {
    const {
        setActiveTab,
        setActiveComponent,
        setCurriculumForm,
        setInfoForm,
        setSettings,
    } = useInstructerContext();

    return (
        <button
            type="button"
            className=" bg-orange-400 text-white font-semibold py-1 px-3 rounded-md transition-all
                hover:scale-105 active:scale-95 hover:bg-orange-300    
            "
            onClick={() => {
                setCurriculumForm(CurriculumFormInitialData);
                setInfoForm(InfoFormInitialFormData);
                setSettings(SettingsInitialData);
                setActiveTab("createNewCourse");
                setActiveComponent(<CreateNewCourse />);
            }}
        >
            Create New Course
        </button>
    );
}

export default CreateNewCourseButton;
