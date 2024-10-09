import { AxiosError } from "axios";
import axiosInstance from "../../../../../../../../../../services/axios";
import { useInstructerContext } from "../../../../../../../InstructerContext";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../../../../../../../../GlobalContext";

function PublishButton() {
    const { curriculumForm, infoForm, settings } = useInstructerContext();
    const { setNewCouse } = useGlobalContext();

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

    const correctSettings = {
        ...settings,
        image: Object.fromEntries(
            Object.entries(settings.image).filter(
                ([key, _]) => key !== "isFileLoading",
            ),
        ),
    };

    const publishCourse = async () => {
        const course = {
            lectures: curriculumForm,
            ...infoForm,
            ...correctSettings,
        };

        try {
            const response = await axiosInstance.post("/course/add", course);
            toast.success(response.data.message);
            setNewCouse(response.data.data);
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
            className="c-btn bg-primary text-white disabled:pointer-events-auto disabled:bg-gray-600"
            disabled={
                !isCurriculumFormValid || !isInfoFormValid || !isSettingsValid
            }
            onClick={publishCourse}
        >
            Publish
        </button>
    );
}

export default PublishButton;
