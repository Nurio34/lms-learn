import {
    IoArrowBackCircleOutline,
    IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { useProgressContext } from "../../../../Context";

function MenuToggleButton() {
    const { isSideMenuOpen, toggleSideMenu } = useProgressContext();

    return (
        <button
            type="button"
            className={`ml-auto rounded-full transition-all hover:scale-105 active:scale-95 ${
                !isSideMenuOpen
                    ? "bg-[green] hover:bg-green-500"
                    : "bg-[red] hover:bg-red-500"
            }`}
            onClick={toggleSideMenu}
        >
            {!isSideMenuOpen ? (
                <IoArrowBackCircleOutline size={28} color="white" />
            ) : (
                <IoArrowForwardCircleOutline size={28} color="white" />
            )}
        </button>
    );
}

export default MenuToggleButton;
