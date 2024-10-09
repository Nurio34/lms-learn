import { createContext, useContext, useState } from "react";
import Dashboard from "./Components/Dashboard";
import {
    CurriculumFormInitialData,
    CurriculumFormType,
    InfoFormInitialFormData,
    InfoFormType,
    SettingsInitialData,
    SettingsType,
} from "../../config";
import CreateNewCourse from "./Components/Dashboard/CreateNewCourse";

export type ActiveTabType = "dashboard" | "courses" | "createNewCourse";

type GlobalContextType = {
    activeTab: ActiveTabType;
    setActiveTab: React.Dispatch<React.SetStateAction<ActiveTabType>>;
    activeComponent: JSX.Element;
    setActiveComponent: React.Dispatch<React.SetStateAction<JSX.Element>>;
    curriculumForm: CurriculumFormType;
    setCurriculumForm: React.Dispatch<React.SetStateAction<CurriculumFormType>>;
    settings: SettingsType;
    setSettings: React.Dispatch<React.SetStateAction<SettingsType>>;
    uploadProgress: number;
    setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
    infoForm: InfoFormType;
    setInfoForm: React.Dispatch<React.SetStateAction<InfoFormType>>;
};

const GlobalContext = createContext({} as GlobalContextType);

function InstructerProvider({ children }: { children: JSX.Element }) {
    const [activeTab, setActiveTab] =
        useState<ActiveTabType>("createNewCourse");

    const [activeComponent, setActiveComponent] = useState<JSX.Element>(
        <CreateNewCourse />,
    );
    const [curriculumForm, setCurriculumForm] = useState<CurriculumFormType>(
        CurriculumFormInitialData,
    );
    const [settings, setSettings] = useState<SettingsType>(SettingsInitialData);
    const [uploadProgress, setUploadProgress] = useState<number>(100);
    const [infoForm, setInfoForm] = useState<InfoFormType>(
        InfoFormInitialFormData,
    );

    return (
        <GlobalContext.Provider
            value={{
                activeTab,
                setActiveTab,
                activeComponent,
                setActiveComponent,
                curriculumForm,
                setCurriculumForm,
                settings,
                setSettings,
                uploadProgress,
                setUploadProgress,
                infoForm,
                setInfoForm,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default InstructerProvider;

export const useInstructerContext = () => useContext(GlobalContext);
