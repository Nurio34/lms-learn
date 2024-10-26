import { useLocation } from "react-router-dom";
import { initialUser, useGlobalContext } from "../../../../GlobalContext";
import Dashboard from "../../../../pages/instructer/Components/Dashboard";

function LogoutButton() {
    const location = useLocation();
    const isAuthPage = location.pathname.includes("auth");

    const { setAuthenticated, setUser, setActiveTab, setActiveComponent } =
        useGlobalContext();

    const onClick = () => {
        sessionStorage.clear();
        setAuthenticated(false);
        setUser(initialUser);
        setActiveTab("dashboard");
        setActiveComponent(<Dashboard />);
    };

    return (
        <>
            {!isAuthPage && (
                <button
                    type="button"
                    className=" bg-[red] py-1 px-4 rounded-md text-white font-semibold w-full transition-all
                hover:bg-red-500  hover:scale-105
            "
                    onClick={onClick}
                >
                    Logout
                </button>
            )}
        </>
    );
}

export default LogoutButton;
