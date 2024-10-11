import { AxiosError } from "axios";
import axiosInstance from "../../../../../../../../services/axios";
import { useInstructerContext } from "../../../../../InstructerContext";
import toast from "react-hot-toast";
import {
    CurriculumFormInitialData,
    InfoFormInitialFormData,
    SettingsInitialData,
} from "../../../../../../../config";
import Dashboard from "../../..";

function PublishButton() {
    const {
        curriculumForm,
        infoForm,
        settings,
        setCurriculumForm,
        setInfoForm,
        setSettings,
        setActiveTab,
        setActiveComponent,
        isEditing,
        setIsEditing,
        courseToEdit,
    } = useInstructerContext();

    const isCurriculumFormValid = curriculumForm.every(
        (item) => item.title.trim() !== "" && item.videoUrl.trim() !== "",
    );

    const isInfoFormValid = Object.values(infoForm).every(
        (item) => item.trim() !== "",
    );

    const isSettingsValid = Object.values(settings).every((object) => {
        return Object.values(object).every(
            (item) => item.toString().trim() !== "",
        );
    });

    const isAtLeastOneLectureFreePreview = curriculumForm.some(
        (lecture) => lecture.freePreview,
    );

    const publishCourse = async () => {
        const course = {
            lectures: curriculumForm,
            ...infoForm,
            ...settings,
            _id: courseToEdit._id,
        };

        try {
            if (isEditing) {
                const response = await axiosInstance.post(
                    "/course/update",
                    course,
                );
                toast.success(response.data.message);
            } else {
                const response = await axiosInstance.post(
                    "/course/add",
                    course,
                );
                toast.success(response.data.message);
            }
            setCurriculumForm(CurriculumFormInitialData);
            setInfoForm(InfoFormInitialFormData);
            setSettings(SettingsInitialData);
            setIsEditing(false);
            setActiveTab("dashboard");
            setActiveComponent(<Dashboard />);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
                throw new Error(error.response?.data);
            }
        }
    };

    return (
        <button
            type="button"
            className={`c-btn text-white disabled:pointer-events-none bg-primary disabled:bg-gray-600`}
            disabled={
                !isCurriculumFormValid ||
                !isInfoFormValid ||
                !isSettingsValid ||
                !isAtLeastOneLectureFreePreview
            }
            onClick={publishCourse}
        >
            {isEditing ? "Update" : "Publish"}
        </button>
    );
}

export default PublishButton;
