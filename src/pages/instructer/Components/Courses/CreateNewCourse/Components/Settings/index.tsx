import { RotatingLines } from "react-loader-spinner";
import { useInstructerContext } from "../../../../../InstructerContext";
import axiosInstance from "../../../../../../../../services/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

function Settings() {
    const { settings, setSettings, setUploadProgress } = useInstructerContext();

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files || files.length === 0) {
            console.log("File couldn't be selected !");
            return;
        }

        const selectedFile = files[0];
        const FileForm = new FormData();
        FileForm.append("file", selectedFile);
        setSettings((prev) => ({
            ...prev,
            image: { ...prev.image, isFileLoading: true },
        }));

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
            setSettings((prev) => ({
                ...prev,
                image: {
                    ...prev.image,
                    imageUrl: response.data.data.url,
                    public_id: response.data.data.public_id,
                    isFileLoading: false,
                },
            }));
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }

            throw new Error("Error while uploading image to cloudinary !");
        }
    };

    return (
        <form className="py-3">
            <label
                htmlFor="image"
                className="space-y-[2vh] md:space-y-0 md:flex md:gap-3 md:items-center"
            >
                <p className="font-semibold text-left">Upload Course Image</p>
                <input
                    type="file"
                    name="image"
                    id="image"
                    className=" border-2 rounded-lg overflow-hidden"
                    onChange={handleFile}
                />
            </label>
            {settings.image.isFileLoading ? (
                <RotatingLines
                    visible={true}
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                />
            ) : (
                <img src={settings.image.imageUrl} className=" m-3 max-h-96" />
            )}
        </form>
    );
}

export default Settings;
