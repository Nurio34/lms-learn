import { RiLogoutBoxLine } from "react-icons/ri";
import { initialUser, useGlobalContext } from "../../../../GlobalContext";
import Dashboard from "../../../../pages/instructer/Components/Dashboard";

function LogoutButton() {
    const {
        setAuthenticated,
        setUser,
        setActiveTab,
        setActiveComponent,
        isSmallScreen,
    } = useGlobalContext();

    const onClick = () => {
        sessionStorage.clear();
        setAuthenticated(false);
        setUser(initialUser);
        setActiveTab("dashboard");
        setActiveComponent(<Dashboard />);
    };

    return (
        <button
            type="button"
            className=" bg-[red] py-1 px-4 rounded-md text-white font-semibold md:w-full transition-all
                hover:bg-red-500  hover:scale-105
            "
            onClick={onClick}
        >
            {isSmallScreen ? <RiLogoutBoxLine size={24} /> : "Logout"}
        </button>
    );
}

export default LogoutButton;
