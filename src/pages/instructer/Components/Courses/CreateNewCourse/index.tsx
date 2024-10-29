import { useState } from "react";
import ActiveTab from "./Components/ActiveTab";
import TabButtons, { TabButtonValueType } from "./Components/TabButtons";
import Curriculum from "./Components/Curriculum";
import { useInstructerContext } from "../../../InstructerContext";
import ProgressBar from "../../ProgressBar";
import PublishButton from "./Components/PublishButton";
import Courses from "..";

function CreateNewCourse() {
    const [createActiveTab, setCreateActiveTab] =
        useState<TabButtonValueType>("curriculum");
    const [component, setComponent] = useState<JSX.Element>(<Curriculum />);

    const { setActiveTab, setActiveComponent, setIsEditing } =
        useInstructerContext();

    return (
        <section className=" bg-white md:my-8 md:mx-16 md:py-3 md:px-6 rounded-l space-y-3 min-h-[760px]">
            <div className="flex justify-between items-center border-b-2 shadow-sm pb-1  relative">
                <h1 className=" text-2xl font-semibold">Create New Course</h1>
                <div className=" space-x-3">
                    <button
                        type="button"
                        className="py-1 px-3 rounded-md font-semibold bg-blue-500 text-white transition-all
                        hover:bg-blue-400 hover:scale-105 active:scale-95
                    "
                        onClick={() => {
                            setIsEditing(false);
                            setActiveTab("courses");
                            setActiveComponent(<Courses />);
                        }}
                    >
                        Courses
                    </button>
                </div>
                <ProgressBar />
            </div>
            <div className="md:flex md:justify-between space-y-[1vh]">
                <div>
                    <TabButtons
                        activeTab={createActiveTab}
                        setActiveTab={setCreateActiveTab}
                        setComponent={setComponent}
                    />
                </div>
                <div className="flex justify-end">
                    <PublishButton />
                </div>
            </div>

            <ActiveTab component={component} />
        </section>
    );
}

export default CreateNewCourse;
