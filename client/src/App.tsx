import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import Header from "./components/Header";
import RouteGuard from "./components/Route-Guard";
import { useGlobalContext } from "./GlobalContext";
import InstructerPage from "./pages/instructer";
import StudentHomePage from "./pages/student/home";
import StudentLessonsPage from "./pages/student/lessons";
import NotFoundPage from "./pages/not-found";

function App() {
    const { authenticated, user } = useGlobalContext();

    return (
        <div className="m-3">
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
                    {/* Nested Route under /student */}
                    <Route path="lessons" element={<StudentLessonsPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
