import { Outlet } from "react-router-dom";

function StudentHomePage() {
    return (
        <>
            <div>Student Home Page</div>;
            <Outlet />
        </>
    );
}

export default StudentHomePage;
