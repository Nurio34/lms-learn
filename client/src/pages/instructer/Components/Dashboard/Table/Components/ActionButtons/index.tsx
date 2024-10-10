import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

type ActionButtonsType = {
    courseId: string;
};

function ActionButtons({ courseId }: ActionButtonsType) {
    return (
        <div className=" justify-self-center flex gap-6 items-center">
            <EditButton courseId={courseId} />
            <DeleteButton courseId={courseId} />
        </div>
    );
}

export default ActionButtons;
