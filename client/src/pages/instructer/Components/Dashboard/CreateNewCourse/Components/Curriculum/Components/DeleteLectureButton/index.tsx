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
        if (!wannaDelete) {
            setWannaDelete(true);
            return;
        }

        setCurriculumForm((prev) => {
            return prev.filter((_, ind) => {
                return ind !== index;
            });
        });
    };

    return (
        <>
            {curriculumForm[index].videoUrl.trim() !== "" && (
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
