import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Header from "./components/Header";
import StudentHomePage from "./pages/student";
import InstructerHomePage from "./pages/instructer";
import { useGlobalContext } from "./GlobalContext";
import RouteGuard from "./RouteGuard";
InstructerHomePage;

function App() {
    const { authenticated, user } = useGlobalContext();
    const role = user.role!;

    return (
        <div className="m-3">
            <Header />
            {/* <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/student" element={<StudentHomePage />} />
                <Route path="/instructer" element={<InstructerHomePage />} />
                <Route path="/instructer/dash" element={<p>Dash</p>} />
            </Routes> */}
            <Routes>
                <Route
                    path="/"
                    element={
                        <RouteGuard
                            authenticated={authenticated}
                            role={role}
                            element={<HomePage />}
                        />
                    }
                ></Route>
                <Route
                    path="/student"
                    element={
                        <RouteGuard
                            authenticated={authenticated}
                            role={role}
                            element={<StudentHomePage />}
                        />
                    }
                ></Route>
                <Route
                    path="instructer"
                    element={
                        <RouteGuard
                            authenticated={authenticated}
                            role={role}
                            element={<InstructerHomePage />}
                        />
                    }
                ></Route>
            </Routes>
        </div>
    );
}

export default App;
