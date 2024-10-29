import Curriculum from "../Curriculum";
import InfoForm from "../InfoForm";
import Settings from "../Settings";
import TabButton from "./TabButton";

export type TabButtonValueType = "curriculum" | "info" | "settings";

export type TabButtonType = {
    value: TabButtonValueType;
    component: JSX.Element;
};

type TabButtonsType = {
    activeTab: TabButtonValueType;
    setActiveTab: React.Dispatch<React.SetStateAction<TabButtonValueType>>;
    setComponent: React.Dispatch<React.SetStateAction<JSX.Element>>;
};

function TabButtons({ activeTab, setActiveTab, setComponent }: TabButtonsType) {
    const Tab_Buttons = [
        {
            value: "curriculum" as TabButtonValueType,
            component: <Curriculum />,
        },
        {
            value: "info" as TabButtonValueType,
            component: <InfoForm />,
        },
        {
            value: "settings" as TabButtonValueType,
            component: <Settings />,
        },
    ];

    return (
        <div className="grid md:inline-grid grid-cols-[repeat(3,1fr)] md:grid-cols-[repeat(3,130px)] border-[1px] border-black rounded-md overflow-hidden">
            {Tab_Buttons.map((item) => {
                return (
                    <TabButton
                        key={item.value}
                        item={item}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        setComponent={setComponent}
                    />
                );
            })}
        </div>
    );
}

export default TabButtons;
