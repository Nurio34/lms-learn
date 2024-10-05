import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Header from "./components/Header";
import StudentHomePage from "./pages/student";
import InstructerHomePage from "./pages/instructer";
InstructerHomePage;

function App() {
    return (
        <div className="m-3">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/student" element={<StudentHomePage />} />
                <Route path="/instructer" element={<InstructerHomePage />} />
            </Routes>
        </div>
    );
}

export default App;
