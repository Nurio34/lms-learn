import { TabButtonType, TabButtonValueType } from ".";

type TabButtonComponentType = {
    item: TabButtonType;
    activeTab: TabButtonValueType;
    setActiveTab: React.Dispatch<React.SetStateAction<TabButtonValueType>>;
    setComponent: React.Dispatch<React.SetStateAction<JSX.Element>>;
};

function TabButton({
    item,
    activeTab,
    setActiveTab,
    setComponent,
}: TabButtonComponentType) {
    return (
        <button
            type="button"
            className={`capitalize py-1 md:px-3 text-sm bg-gray-200  transition-all
                ${
                    activeTab === item.value &&
                    "font-bold text-white bg-gray-950  shadow-white shadow-inner"
                }
                ${item.value === "info" && "border-x-[1px] border-black"}
            `}
            onClick={() => {
                setActiveTab(item.value);
                setComponent(item.component);
            }}
        >
            {item.value}
        </button>
    );
}

export default TabButton;
