import { MdOutlineCancel } from "react-icons/md";
import { useGlobalContext } from "../../../../../../../../../../../../../../GlobalContext";

function CancelButton({
    setIsTextAreaFocused,
    setComment,
    setIsEmojiPickerOpen,
    setIsReplying,
    setIsEditing,
}: {
    setIsTextAreaFocused: React.Dispatch<React.SetStateAction<boolean>>;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    setIsEmojiPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsReplying?: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditing?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}) {
    const { isSmallScreen } = useGlobalContext();

    return (
        <button
            type="button"
            className="c-btn bg-[red] hover:bg-red-500 text-white"
            onClick={() => {
                setIsTextAreaFocused(false);
                setComment("");
                setIsEmojiPickerOpen(false);
                if (setIsReplying) {
                    setIsReplying(false);
                }
                if (setIsEditing) {
                    setIsEditing(false);
                }
            }}
        >
            {isSmallScreen ? <MdOutlineCancel /> : "Cancel"}
        </button>
    );
}

export default CancelButton;
