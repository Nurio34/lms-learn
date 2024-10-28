import { MdDelete } from "react-icons/md";
import { CurriculumFormType } from "../../../../../../../../../config";
import { useState } from "react";

type DeleteLectureButton = {
    index: number;
    curriculumForm: CurriculumFormType;
    setCurriculumForm: React.Dispatch<React.SetStateAction<CurriculumFormType>>;
};

function DeleteLectureButton({
    index,
    curriculumForm,
    setCurriculumForm,
}: DeleteLectureButton) {
    const [wannaDelete, setWannaDelete] = useState(false);

    const deleteLecture = () => {
        if (
            curriculumForm[index].videoUrl.trim() === "" &&
            curriculumForm[index].title.trim() === ""
        ) {
            setCurriculumForm((prev) => {
                return prev.filter((_, ind) => {
                    return ind !== index;
                });
            });
        } else {
            if (!wannaDelete) {
                setWannaDelete(true);
                return;
            }

            setCurriculumForm((prev) => {
                return prev.filter((_, ind) => {
                    return ind !== index;
                });
            });
        }
        setWannaDelete(false);
    };

    const deleteButtonVisibilityValidation = () => {
        if (curriculumForm.length === 1) {
            if (curriculumForm[0].videoUrl.trim() === "") {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    };

    return (
        <>
            {deleteButtonVisibilityValidation() && (
                <button
                    type="button"
                    className={`ml-auto c-btn border-2
                        ${
                            wannaDelete &&
                            " bg-[orange] text-white text-lg font-bold"
                        }    
                    `}
                    onClick={deleteLecture}
                >
                    {wannaDelete ? "?" : <MdDelete color="red" size={24} />}
                </button>
            )}
        </>
    );
}

export default DeleteLectureButton;
