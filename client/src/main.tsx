// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import GlobalProvider from "./GlobalContext.tsx";
import InstructerProvider from "./pages/instructer/InstructerContext.tsx";
import StudentProvider from "./pages/student/Context/index.tsx";

createRoot(document.getElementById("root")!).render(
    <>
        <BrowserRouter>
            <GlobalProvider>
                <InstructerProvider>
                    <StudentProvider>
                        <App />
                    </StudentProvider>
                </InstructerProvider>
            </GlobalProvider>
        </BrowserRouter>
        <Toaster />
    </>,
);
