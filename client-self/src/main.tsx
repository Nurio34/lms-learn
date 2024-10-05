import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import GlobalContextProvider from "./GlobalContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <GlobalContextProvider>
                <App />
            </GlobalContextProvider>
        </BrowserRouter>
        <Toaster />
    </StrictMode>,
);
