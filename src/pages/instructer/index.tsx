import { useGlobalContext } from "../../GlobalContext";
import ActiveTab from "./Components/ActiveTab";
import Menubar from "./Components/Menubar";
import { useInstructerContext } from "./InstructerContext";

function InstructerPage() {
    const { isSmallScreen } = useGlobalContext();
    const { activeTab } = useInstructerContext();

    return (
        <div className=" py-3 flex">
            {activeTab !== "createNewCourse" && !isSmallScreen && <Menubar />}
            <ActiveTab />
        </div>
    );
}

export default InstructerPage;
