import { FaRegEdit } from "react-icons/fa";
import axiosInstance from "../../../../../../../../services/axios";
import { useInstructerContext } from "../../../../../InstructerContext";
import CreateNewCourse from "../../../CreateNewCourse";
import { useEffect } from "react";
type EditButtoType = {
    courseId: string;
};

function EditButton({ courseId }: EditButtoType) {
    const {
        setCourseToEdit,
        activeTab,
        setActiveTab,
        setActiveComponent,
        isEditing,
        setIsEditing,
    } = useInstructerContext();

    const handleOnClick = async () => {
        const response = await axiosInstance.get(
            `course/get-course/${courseId}`,
        );
        setCourseToEdit(response.data.course);
        setActiveTab("createNewCourse");
        setIsEditing(true);
    };

    useEffect(() => {
        if (isEditing) {
            setActiveComponent(<CreateNewCourse />);
        }
    }, [activeTab, isEditing]);

    return (
        <button type="button" title="Edit">
            <FaRegEdit
                size={20}
                color="blue"
                className="transition-all hover:scale-110 active:scale-90"
                onClick={handleOnClick}
            />
        </button>
    );
}

export default EditButton;
