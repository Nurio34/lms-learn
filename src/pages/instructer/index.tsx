import ActiveTab from "./Components/ActiveTab";
import Menubar from "./Components/Menubar";
import { useInstructerContext } from "./InstructerContext";

function InstructerPage() {
    const { activeTab } = useInstructerContext();

    return (
        <div className=" py-3 flex">
            {activeTab !== "createNewCourse" && <Menubar />}
            <ActiveTab />
        </div>
    );
}

export default InstructerPage;
