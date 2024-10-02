import { Navigate, useLocation, useNavigate } from "react-router-dom";

type UserType = {
    id: string;
    username: string;
    email: string;
    role: "instructer" | "student";
    iat: number;
    exp: number;
};

type RouteGuardType = {
    authenticated: boolean;
    user: UserType;
    element: JSX.Element;
};

function RouteGuard({ authenticated, user, element }: RouteGuardType) {
    const location = useLocation();
    const navigate = useNavigate();

    if (!authenticated && !location.pathname.includes("/auth")) {
        navigate("/auth");
    }
}

export default RouteGuard;
