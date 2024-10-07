import axiosInstance from "../../../../../../../../services/axios";
import { CurriculumFormInitialData } from "../../../../../../../config";
import { useInstructerContext } from "../../../../../InstructerContext";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import VideoPlayer from "../../../../../../../components/ReactPlayer";

function Curriculum() {
    const {
        curriculumForm,
        setCurriculumForm,
        uploadProgress,
        setUploadProgress,
    } = useInstructerContext();

    const handleFileChose = async (
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
        const url = URL.createObjectURL(selectedFile);

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
                            previewUrl: url,
                        };
                    }
                    return item;
                });
            });

            toast.success(response.data.message);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    };

    return (
        <form className="space-y-6">
            <button
                type="button"
                className="py-1 px-3 rounded-md font-semibold bg-green-500 text-white transition-all
                    hover:bg-green-400 hover:scale-105 active:scale-95    
                "
                onClick={() =>
                    setCurriculumForm((prev) => [
                        ...prev,
                        ...CurriculumFormInitialData,
                    ])
                }
            >
                Add Lecture
            </button>
            {curriculumForm.map((_, index) => {
                return (
                    <div
                        key={index}
                        className=" border-b-2 shadow-md py-3 px-6 flex gap-12 items-center flex-wrap"
                    >
                        <div className=" space-y-3">
                            <div className="flex items-center gap-6">
                                <label
                                    htmlFor={"title" + index}
                                    className=" flex gap-3 items-center"
                                >
                                    <p className="font-semibold">
                                        Lecture {index + 1}
                                    </p>
                                    <input
                                        type="text"
                                        name={"title" + index}
                                        id={"title" + index}
                                        placeholder="Enter lecture title ..."
                                        className="border-2 py-1 px-3 rounded-md"
                                        value={curriculumForm[index].title}
                                        onChange={(e) => {
                                            setCurriculumForm((prev) => {
                                                return prev.map((item, ind) => {
                                                    if (ind === index) {
                                                        return {
                                                            ...item,
                                                            title: e.target
                                                                .value,
                                                        };
                                                    }
                                                    return item;
                                                });
                                            });
                                        }}
                                    />
                                </label>
                                <label
                                    htmlFor={"freePreview" + index}
                                    className="flex items-center gap-3"
                                >
                                    <input
                                        type="checkbox"
                                        name={"freePreview" + index}
                                        id={"freePreview" + index}
                                        className="border-2 py-1 px-3 rounded-md"
                                        checked={
                                            curriculumForm[index].freePreview
                                        }
                                        onChange={(e) => {
                                            setCurriculumForm((prev) => {
                                                return prev.map((item, ind) => {
                                                    if (ind === index) {
                                                        return {
                                                            ...item,
                                                            freePreview:
                                                                e.target
                                                                    .checked,
                                                        };
                                                    }
                                                    return item;
                                                });
                                            });
                                        }}
                                    />
                                    <p className="font-semibold">
                                        Free Preview
                                    </p>
                                </label>
                            </div>
                            <input
                                type="file"
                                name="video"
                                id="video"
                                className="border-2  rounded-md"
                                onChange={(e) => handleFileChose(e, index)}
                            />
                        </div>
                        {curriculumForm[index].isFileLoading ? (
                            <RotatingLines
                                visible={true}
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                            />
                        ) : uploadProgress !== 0 ? (
                            <VideoPlayer lecture={index} />
                        ) : null}
                    </div>
                );
            })}
        </form>
    );
}

export default Curriculum;
