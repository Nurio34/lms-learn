import { GoGraph } from "react-icons/go";
import { SiGoogledisplayandvideo360 } from "react-icons/si";
import Dashboard from "../Dashboard";
import MenuButton from "./Components/MenuButton";
import { ActiveTabType } from "../../InstructerContext";
import Courses from "../Courses";

export type MenuItemType = {
    icon: JSX.Element;
    label: string;
    value: ActiveTabType;
    component: JSX.Element;
};

function Menubar() {
    const MenuItems = [
        {
            icon: <GoGraph />,
            label: "Dashboard",
            value: "dashboard" as ActiveTabType,
            component: <Dashboard />,
        },
        {
            icon: <SiGoogledisplayandvideo360 />,
            label: "Courses",
            value: "courses" as ActiveTabType,
            component: <Courses />,
        },
    ];

    return (
        <aside className=" max-w-min xl:max-w-48 min-h-[840px] border-r-2 space-y-3 px-3 transition-all">
            {MenuItems.map((item) => {
                return <MenuButton key={item.value} item={item} />;
            })}
        </aside>
    );
}

export default Menubar;
