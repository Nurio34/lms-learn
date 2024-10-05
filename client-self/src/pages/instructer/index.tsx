import { Navigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";

function InstructerHomePage() {
    const { authenticated, user } = useGlobalContext();

    const role = user.role;

    const location = useLocation();

    if (!authenticated) {
        return <Navigate to={"/"} />;
    } else if (
        authenticated &&
        role === "student" &&
        location.pathname.includes("intructer")
    ) {
        return <Navigate to={"/student"} />;
    }

    return <p>Welcome to Instructer Homepage</p>;
}

export default InstructerHomePage;
