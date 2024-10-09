import { useState } from "react";
import toast from "react-hot-toast";
import "./index.css";

type DeleteVideoButtonType = {
    deleteVideo: (index: number) => Promise<any>;
    index: number;
};

function DeleteVideoButton({ deleteVideo, index }: DeleteVideoButtonType) {
    const [wannaDelete, setWannaDelete] = useState(false);

    return (
        <button
            type="button"
            className={`py-1 px-3 font-semibold rounded-md transition-all cursor-pointer  ${
                wannaDelete
                    ? "Flip bg-[orange]  hover:bg-orange-500 "
                    : "bg-[red] text-white hover:bg-red-500"
            } `}
            onClick={async () => {
                if (!wannaDelete) {
                    setWannaDelete(true);
                    return;
                }

                try {
                    const response = await deleteVideo(index);

                    if (response.data.result !== "ok") {
                        toast.error("Something went wrong !");
                        return;
                    }

                    toast.success(response.message);
                } catch (error) {
                    console.log(error);
                    toast.error("Unxpected error while deleting !");
                }
            }}
        >
            {wannaDelete ? "Sure ?" : "Delete"}
        </button>
    );
}

export default DeleteVideoButton;
