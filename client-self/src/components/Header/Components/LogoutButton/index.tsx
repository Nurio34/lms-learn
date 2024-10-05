import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../../../../GlobalContext";

function LogoutButton() {
    const { setAuthenticated } = useGlobalContext();

    const location = useLocation();

    return (
        <>
            {location.pathname !== "/" && (
                <button
                    type="button"
                    className=" bg-[red] font-semibold py-1 px-3 rounded-md capitalize"
                    style={{ fontVariant: "small-caps" }}
                    onClick={() => {
                        sessionStorage.clear();
                        setAuthenticated(false);
                    }}
                >
                    logout
                </button>
            )}
        </>
    );
}

export default LogoutButton;
