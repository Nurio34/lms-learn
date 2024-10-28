import { useState } from "react";
import { ActiveTabType } from "../pages/instructer/InstructerContext";
import Courses from "../pages/instructer/Components/Courses";

const useInstructerActiveTab = () => {
    const [activeTab, setActiveTab] = useState<ActiveTabType>("courses");
    const [activeComponent, setActiveComponent] = useState<JSX.Element>(
        <Courses />,
    );

    return { activeTab, setActiveTab, activeComponent, setActiveComponent };
};

export default useInstructerActiveTab;
