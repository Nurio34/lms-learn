import toast from "react-hot-toast";

type ReplaceVideoButtonType = {
    uploadVideo: (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
    ) => Promise<void>;
    deleteVideo: (index: number) => Promise<void>;
    index: number;
};

function ReplaceVideoButton({
    uploadVideo,
    deleteVideo,
    index,
}: ReplaceVideoButtonType) {
    return (
        <label>
            <p
                className="c-btn bg-blue-500 text-white
                            hover:bg-blue-400
            "
            >
                Replace Video
            </p>
            <input
                type="file"
                name="video"
                id="video"
                className="border-2  rounded-md hidden"
                onChange={async (e) => {
                    try {
                        const deleteResponse: any = await deleteVideo(index);

                        if (deleteResponse.success) {
                            const response: any = await uploadVideo(e, index);

                            if (response.success) {
                                toast.success(
                                    "Video replaced successfully ...",
                                );
                            }
                        }
                    } catch (error) {}
                }}
            />
        </label>
    );
}

export default ReplaceVideoButton;
