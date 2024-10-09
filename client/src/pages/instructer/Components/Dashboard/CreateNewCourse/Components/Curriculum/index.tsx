import axiosInstance from "../../../../../../../../services/axios";
import { useInstructerContext } from "../../../../../InstructerContext";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import AddLectureButton from "./Components/AddLectureButton";
import LectureForm from "./Components/LectureForm";

function Curriculum() {
    const {
        curriculumForm,
        setCurriculumForm,
        uploadProgress,
        setUploadProgress,
    } = useInstructerContext();

    const uploadVideo = async (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const file = e.target.files;

        if (!file) {
            throw new Error("Error while choosing video");
        }

        const selectedFile = file[0];
        const FileForm = new FormData();
        FileForm.append("file", selectedFile);

        setCurriculumForm((prev) => {
            return prev.map((item, ind) => {
                if (ind === index) {
                    return {
                        ...item,
                        isFileLoading: true,
                    };
                }
                return item;
            });
        });

        try {
            const response = await axiosInstance.post(
                "/media/upload",
                FileForm,
                {
                    onUploadProgress: (progressEvent: ProgressEvent) => {
                        // Calculate the percentage
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total,
                        );

                        setUploadProgress(percentCompleted);
                        // Update the progress bar and percentage text
                    },
                },
            );

            setCurriculumForm((prev) => {
                return prev.map((item, ind) => {
                    if (ind === index) {
                        return {
                            ...item,
                            videoUrl: response.data.data.url,
                            public_id: response.data.data.public_id,
                            isFileLoading: false,
                        };
                    }
                    return item;
                });
            });

            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    };

    const deleteVideo = async (index: number) => {
        try {
            const response = await axiosInstance.delete(
                `/media/delete/${curriculumForm[index].public_id}`,
            );
            if (response.data.data.result === "ok") {
                setCurriculumForm((prev) => {
                    return prev.map((item, ind) => {
                        if (ind === index) {
                            return { ...item, videoUrl: "", public_id: "" };
                        } else {
                            return item;
                        }
                    });
                });
                return response.data;
            } else {
                return {
                    success: false,
                    message: "Video couldn't be found !",
                };
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="space-y-6">
            <AddLectureButton
                curriculumForm={curriculumForm}
                setCurriculumForm={setCurriculumForm}
            />

            {curriculumForm.map((_, index) => {
                return (
                    <LectureForm
                        key={index}
                        index={index}
                        curriculumForm={curriculumForm}
                        setCurriculumForm={setCurriculumForm}
                        uploadVideo={uploadVideo}
                        uploadProgress={uploadProgress}
                        deleteVideo={deleteVideo}
                    />
                );
            })}
        </form>
    );
}

export default Curriculum;
