import { useState } from "react";
import { ActiveTabType } from "../pages/instructer/InstructerContext";
import Dashboard from "../pages/instructer/Components/Dashboard";

const useInstructerActiveTab = () => {
    const [activeTab, setActiveTab] = useState<ActiveTabType>("dashboard");
    const [activeComponent, setActiveComponent] = useState<JSX.Element>(
        <Dashboard />,
    );

    return { activeTab, setActiveTab, activeComponent, setActiveComponent };
};

export default useInstructerActiveTab;
