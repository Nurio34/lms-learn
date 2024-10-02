import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import Header from "./components/Header";

function App() {
    return (
        <div className="m-3">
            <Header />
            <Routes>
                <Route path="auth" element={<AuthPage />} />
            </Routes>
        </div>
    );
}

export default App;
