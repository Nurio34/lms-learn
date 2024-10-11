import axiosInstance from "../../../../../../../../services/axios";
import { useInstructerContext } from "../../../../../InstructerContext";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import AddLectureButton from "./Components/AddLectureButton";
import LectureForm from "./Components/LectureForm";
import AddLecturesButton from "./Components/AddLecturesButton";

function Curriculum() {
    const {
        curriculumForm,
        setCurriculumForm,
        uploadProgress,
        setUploadProgress,
        setIsBulkUploading,
    } = useInstructerContext();

    console.log(curriculumForm);

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

    const uploadVideos = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsBulkUploading(true);

        const files = e.target.files;

        if (!files || files.length === 0) {
            throw new Error("Error while choosing video");
        }

        const filesArray = Object.values(files);

        const FileForm = new FormData();

        filesArray.forEach((file) => FileForm.append(`file`, file));

        try {
            const response = await axiosInstance.post(
                "/media/bulk-upload",
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
            console.log({ response });

            setIsBulkUploading(false);

            if (
                curriculumForm[curriculumForm.length - 1].title.trim() === "" &&
                curriculumForm[curriculumForm.length - 1].videoUrl.trim() === ""
            ) {
                setCurriculumForm(
                    response.data.videos.map((video: any, index: number) => {
                        return {
                            title: `Lecture ${index + 1}`,
                            videoUrl: video.url,
                            public_id: video.public_id,
                            freePreview: false,
                        };
                    }),
                );
            } else {
                setCurriculumForm((prev) => [
                    ...prev,
                    ...response.data.videos.map((video: any) => {
                        return {
                            title: `Lecture`,
                            videoUrl: video.url,
                            public_id: video.public_id,
                            freePreview: false,
                        };
                    }),
                ]);
            }

            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    };

    return (
        <form className="space-y-6">
            <div>
                <AddLectureButton
                    curriculumForm={curriculumForm}
                    setCurriculumForm={setCurriculumForm}
                />
                <AddLecturesButton uploadVideos={uploadVideos} />
            </div>

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
