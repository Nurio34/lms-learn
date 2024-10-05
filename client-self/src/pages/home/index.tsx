import { Navigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import Form from "./components/Form";

function HomePage() {
    const { authenticated, user } = useGlobalContext();

    const role = user.role;

    const location = useLocation();

    if (authenticated && role === "student") {
        return <Navigate to={"/student"} />;
    } else if (authenticated && role === "instructer") {
        return <Navigate to={"/instructer"} />;
    }

    return (
        <div className="min-h-[500px] flex justify-center items-center ">
            <Form />
        </div>
    );
}

export default HomePage;
