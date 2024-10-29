import toast from "react-hot-toast";
import { CurriculumFormType } from "../../../../../../../../../config";
import { RotatingLines } from "react-loader-spinner";
import VideoPlayer from "../../../../../../../../../components/ReactPlayer";
import ReplaceVideoButton from "../ReplaceVideoButton";
import DeleteLectureButton from "../DeleteLectureButton";
import { LectureType } from "../../../../../../../../../types/course";

type LectureFormType = {
    index: number;
    curriculumForm: CurriculumFormType;
    setCurriculumForm: React.Dispatch<React.SetStateAction<CurriculumFormType>>;
    uploadVideo: (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
    ) => Promise<any>;
    uploadProgress: number;
    deleteVideo: (index: number) => Promise<any>;
    lecture: LectureType;
};

function LectureForm({
    index,
    curriculumForm,
    setCurriculumForm,
    uploadVideo,
    uploadProgress,
    deleteVideo,
    lecture,
}: LectureFormType) {
    return (
        <div
            key={index}
            className=" border-b-2 shadow-md py-3 px-6
                                    flex flex-col gap-3 "
        >
            <div className=" space-y-3">
                <div className="grid md:flex md:items-center md:gap-6">
                    <label
                        htmlFor={"title" + index}
                        className=" flex gap-3 items-center md:w-1/3"
                    >
                        <p className="font-semibold min-w-max">
                            Lecture {index + 1}
                        </p>
                        <input
                            type="text"
                            name={"title" + index}
                            id={"title" + index}
                            placeholder="Enter lecture title ..."
                            className="border-2 py-1 px-3 rounded-md w-full"
                            value={curriculumForm[index].title}
                            onChange={(e) => {
                                setCurriculumForm((prev) => {
                                    return prev.map((item, ind) => {
                                        if (ind === index) {
                                            return {
                                                ...item,
                                                title: e.target.value,
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
                            checked={curriculumForm[index].freePreview}
                            onChange={(e) => {
                                setCurriculumForm((prev) => {
                                    return prev.map((item, ind) => {
                                        if (ind === index) {
                                            return {
                                                ...item,
                                                freePreview: e.target.checked,
                                            };
                                        }
                                        return item;
                                    });
                                });
                            }}
                        />
                        <p className="font-semibold">Free Preview</p>
                    </label>
                    <DeleteLectureButton
                        index={index}
                        curriculumForm={curriculumForm}
                        setCurriculumForm={setCurriculumForm}
                    />
                </div>
                {curriculumForm[index].videoUrl.trim() === "" && (
                    <input
                        type="file"
                        name="video"
                        id="video"
                        className="border-2  rounded-md max-w-full"
                        onChange={async (e) => {
                            const response = await uploadVideo(e, index);

                            if (response.success) {
                                toast.success(response.message);
                            }
                        }}
                    />
                )}
            </div>
            {curriculumForm[index].isFileLoading ? (
                <RotatingLines
                    visible={true}
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                />
            ) : uploadProgress !== 0 && curriculumForm[index].videoUrl ? (
                <div className="  md:flex md:gap-6 md:items-center">
                    <div className="md:max-w-96">
                        <VideoPlayer lecture={lecture} />
                    </div>
                    <ReplaceVideoButton
                        uploadVideo={uploadVideo}
                        deleteVideo={deleteVideo}
                        index={index}
                    />
                </div>
            ) : null}
        </div>
    );
}

export default LectureForm;
