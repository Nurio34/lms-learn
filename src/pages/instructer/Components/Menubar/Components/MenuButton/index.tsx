import { MenuItemType } from "../..";
import { useInstructerContext } from "../../../../InstructerContext";

function MenuButton({ item }: { item: MenuItemType }) {
    const { activeTab, setActiveTab, setActiveComponent } =
        useInstructerContext();

    return (
        <button
            type="button"
            title={item.label}
            className={`xl:w-full bg-black text-white py-1 px-3 rounded-full xl:rounded-md aspect-square xl:aspect-auto transition-all
                flex gap-3 items-center justify-start
                ${
                    activeTab === item.value
                        ? "font-bold"
                        : "bg-gray-300 text-black"
                }    
            `}
            onClick={() => {
                setActiveTab(item.value);
                setActiveComponent(item.component);
            }}
        >
            <p>{item.icon}</p>
            <p className="hidden xl:block">{item.label}</p>
        </button>
    );
}

export default MenuButton;
