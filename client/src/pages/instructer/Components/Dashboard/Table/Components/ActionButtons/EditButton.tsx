import { FaRegEdit } from "react-icons/fa";

function EditButton() {
    return (
        <button type="button" title="Edit">
            <FaRegEdit
                size={20}
                color="blue"
                className="transition-all hover:scale-110 active:scale-90"
            />
        </button>
    );
}

export default EditButton;
