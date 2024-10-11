import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import Header from "./components/Header";
import RouteGuard from "./components/Route-Guard";
import { useGlobalContext } from "./GlobalContext";
import InstructerPage from "./pages/instructer";
import StudentHomePage from "./pages/student/pages/home";
import StudentLessonsPage from "./pages/student/pages/lessons";
import NotFoundPage from "./pages/not-found";
import HiddenCredentials from "./components/HiddenCredentials";

function App() {
    const { authenticated, user } = useGlobalContext();

    return (
        <div className="m-3">
            <HiddenCredentials />
            <Header />
            <Routes>
                <Route
                    path="/auth"
                    element={
                        <RouteGuard
                            authenticated={authenticated}
                            user={user}
                            element={<AuthPage />}
                        />
                    }
                />
                <Route
                    path="/instructer"
                    element={
                        <RouteGuard
                            authenticated={authenticated}
                            user={user}
                            element={<InstructerPage />}
                        />
                    }
                />
                <Route
                    path="/student"
                    element={
                        <RouteGuard
                            authenticated={authenticated}
                            user={user}
                            element={<StudentHomePage />}
                        />
                    }
                >
                    <Route path="lessons" element={<StudentLessonsPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
