import { Navigate, useLocation } from "react-router-dom";

type RouteGuardType = {
    authenticated: boolean;
    role: string;
    element: JSX.Element;
};

function RouteGuard({ authenticated, role, element }: RouteGuardType) {
    const location = useLocation();

    if (!authenticated && location.pathname !== "/") {
        return <Navigate to={"/"} />;
    } else if (
        authenticated &&
        role === "student" &&
        location.pathname === "/"
    ) {
        return <Navigate to={"/student"} />;
    } else if (
        authenticated &&
        role === "instructer" &&
        location.pathname === "/"
    ) {
        return <Navigate to={"/instructer"} />;
    }

    return element;
}

export default RouteGuard;
