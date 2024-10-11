import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserType } from "../../GlobalContext";
import { Fragment } from "react";

type RouteGuardType = {
    authenticated: boolean;
    user: UserType;
    element: React.JSX.Element;
};

function RouteGuard({ authenticated, user, element }: RouteGuardType) {
    const location = useLocation();
    const role = user.role;

    if (!authenticated && !location.pathname.includes("/auth")) {
        console.log("1");

        return <Navigate to="/auth" />;
    } else if (
        authenticated &&
        role !== "instructer" &&
        (location.pathname.includes("/auth") ||
            location.pathname.includes("/instructer"))
    ) {
        console.log("2");

        return <Navigate to="/student" />;
    } else if (
        authenticated &&
        role === "instructer" &&
        !location.pathname.includes("/instructer")
    ) {
        console.log("3");

        return <Navigate to="/instructer" />;
    }

    return (
        <div>
            {location.pathname === "/student" ? (
                <Fragment>{element}</Fragment>
            ) : (
                <Outlet />
            )}
        </div>
    );
}

export default RouteGuard;
