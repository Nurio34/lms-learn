import { RiChatDeleteFill } from "react-icons/ri";

type DeleteButtoType = {
    courseId: string;
};

function DeleteButton({ courseId }: DeleteButtoType) {
    return (
        <button
            type="button"
            title="Delete"
            onClick={() => {
                console.log(courseId);
            }}
        >
            <RiChatDeleteFill
                size={20}
                color="red"
                className="transition-all hover:scale-110 active:scale-90"
            />
        </button>
    );
}

export default DeleteButton;
