import { useInstructerContext } from "../../InstructerContext";

function ActiveTab() {
    const { activeComponent } = useInstructerContext();

    return (
        <main className=" md:px-3 w-full bg-gray-200">{activeComponent}</main>
    );
}

export default ActiveTab;
