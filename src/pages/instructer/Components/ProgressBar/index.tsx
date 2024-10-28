import { useInstructerContext } from "../../InstructerContext";
import "./index.css";

function ProgressBar() {
    const { uploadProgress, isBulkUploading } = useInstructerContext();

    return (
        <>
            {isBulkUploading && (
                <div className=" bg-gray-200 absolute bottom-0 left-0 translate-y-full w-full h-1">
                    <div
                        className={`bg-blue-500 h-full transition-all`}
                        style={{
                            width: `${uploadProgress}%`,
                        }}
                    >
                        <div className="ProgressLight bg-blue-300 h-full"></div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProgressBar;
