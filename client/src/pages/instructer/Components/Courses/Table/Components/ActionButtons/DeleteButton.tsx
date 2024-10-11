import { RiChatDeleteFill } from "react-icons/ri";

type DeleteButtoType = {
    courseId: string;
};

function DeleteButton({ courseId }: DeleteButtoType) {
    console.log(courseId);

    return (
        <button type="button" title="Delete">
            <RiChatDeleteFill
                size={20}
                color="red"
                className="transition-all hover:scale-110 active:scale-90"
            />
        </button>
    );
}

export default DeleteButton;
