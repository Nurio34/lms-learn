function ReplyButton({
    setIsReplying,
}: {
    setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <button
            type="button"
            className="font-bold text-sm"
            onClick={() => {
                setIsReplying((prev) => !prev);
            }}
        >
            Reply
        </button>
    );
}

export default ReplyButton;
