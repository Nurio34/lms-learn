import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

function ActionButtons() {
    return (
        <div className=" justify-self-end flex gap-6 items-center">
            <EditButton />
            <DeleteButton />
        </div>
    );
}

export default ActionButtons;
