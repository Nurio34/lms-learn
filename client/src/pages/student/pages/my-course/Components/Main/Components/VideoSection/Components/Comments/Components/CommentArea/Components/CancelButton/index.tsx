import { useProgressContext } from "../../../../../../../../../../Context";

function CancelButton() {
    const {
        setIsTextAreaFocused,
        setClickCount,
        setIndexToPutEmoji,
        setIsAnyIndexSelected,
        setComment,
    } = useProgressContext();

    return (
        <button
            type="button"
            className="c-btn bg-[red] hover:bg-red-500 text-white"
            onClick={() => {
                setIsTextAreaFocused(false);
                setClickCount(0);
                setIndexToPutEmoji(0);
                setIsAnyIndexSelected(false);
                setComment("");
            }}
        >
            Cancel
        </button>
    );
}

export default CancelButton;
