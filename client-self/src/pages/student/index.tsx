import { Navigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";

function StudentHomePage() {
    const { authenticated, user } = useGlobalContext();

    const role = user.role;

    const location = useLocation();

    if (!authenticated) {
        return <Navigate to={"/"} />;
    } else if (
        authenticated &&
        role === "instructer" &&
        location.pathname.includes("student")
    ) {
        return <Navigate to={"/instructer"} />;
    }

    return <p>Welcome to Student Homepage</p>;
}

export default StudentHomePage;
