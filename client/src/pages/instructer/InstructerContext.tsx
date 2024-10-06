import { createContext, useContext, useState } from "react";
import Dashboard from "./Components/Dashboard";

export type ActiveTabType = "dashboard" | "courses" | "createNewCourse";

type GlobalContextType = {
    activeTab: ActiveTabType;
    setActiveTab: React.Dispatch<React.SetStateAction<ActiveTabType>>;
    activeComponent: JSX.Element;
    setActiveComponent: React.Dispatch<React.SetStateAction<JSX.Element>>;
};

const GlobalContext = createContext({} as GlobalContextType);

function InstructerProvider({ children }: { children: JSX.Element }) {
    const [activeTab, setActiveTab] = useState<ActiveTabType>("dashboard");
    const [activeComponent, setActiveComponent] = useState<JSX.Element>(
        <Dashboard />,
    );

    return (
        <GlobalContext.Provider
            value={{
                activeTab,
                setActiveTab,
                activeComponent,
                setActiveComponent,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default InstructerProvider;

export const useInstructerContext = () => useContext(GlobalContext);
