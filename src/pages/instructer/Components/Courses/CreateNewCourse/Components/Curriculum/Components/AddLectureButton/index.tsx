import {
    CurriculumFormInitialData,
    CurriculumFormType,
} from "../../../../../../../../../config";

type AddLectureButtonType = {
    curriculumForm: CurriculumFormType;
    setCurriculumForm: React.Dispatch<React.SetStateAction<CurriculumFormType>>;
};

function AddLectureButton({
    curriculumForm,
    setCurriculumForm,
}: AddLectureButtonType) {
    const isFormValid = curriculumForm.every(
        (item) => item.title.trim() !== "" && item.videoUrl.trim() !== "",
    );

    return (
        <button
            type="button"
            className="py-1 px-3 rounded-md font-semibold bg-green-500 text-white transition-all
                    hover:bg-green-400 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:bg-gray-600
                "
            onClick={() =>
                setCurriculumForm((prev) => [
                    ...prev,
                    ...CurriculumFormInitialData,
                ])
            }
            disabled={!isFormValid}
        >
            Add Lecture
        </button>
    );
}

export default AddLectureButton;
