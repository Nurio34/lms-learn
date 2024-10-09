import axiosInstance from "../../../../../../../../../../services/axios";
import { useInstructerContext } from "../../../../../../../InstructerContext";

function PublishButton() {
    const { curriculumForm, infoForm, settings } = useInstructerContext();

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

    const publisCourse = async () => {
        const course = {
            lectures: curriculumForm,
            ...infoForm,
            ...correctSettings,
        };

        try {
            console.log("Adding course");

            const response = await axiosInstance.post("/course/add", course);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button
            type="button"
            className="c-btn bg-primary text-white disabled:pointer-events-auto disabled:bg-gray-600"
            disabled={
                !isCurriculumFormValid || !isInfoFormValid || !isSettingsValid
            }
            onClick={publisCourse}
        >
            Publish
        </button>
    );
}

export default PublishButton;
