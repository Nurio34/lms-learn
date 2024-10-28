import { createContext, useContext, useState } from "react";
import {
    CurriculumFormInitialData,
    CurriculumFormType,
    InfoFormInitialFormData,
    InfoFormType,
    SettingsInitialData,
    SettingsType,
} from "../../config";
import useFetchCourses from "./Hooks/useFetchCourses";
import useEditCourse from "./Hooks/useEditCourse";
import { CourseType } from "../../types/course";
import { useGlobalContext } from "../../GlobalContext";

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
    isBulkUploading: boolean;
    setIsBulkUploading: React.Dispatch<React.SetStateAction<boolean>>;
    infoForm: InfoFormType;
    setInfoForm: React.Dispatch<React.SetStateAction<InfoFormType>>;
    courses: CourseType[];
    setCourses: React.Dispatch<React.SetStateAction<CourseType[]>>;
    courseToEdit: CourseType;
    setCourseToEdit: React.Dispatch<React.SetStateAction<CourseType>>;
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const GlobalContext = createContext({} as GlobalContextType);

function InstructerProvider({ children }: { children: JSX.Element }) {
    //! *** AVTIVE TABS & ACTIVE COMPONENTS ***
    const { activeComponent, activeTab, setActiveTab, setActiveComponent } =
        useGlobalContext();
    //! ***************************************

    //! *** COURSE FORMS ***
    const [curriculumForm, setCurriculumForm] = useState<CurriculumFormType>(
        CurriculumFormInitialData,
    );
    const [infoForm, setInfoForm] = useState<InfoFormType>(
        InfoFormInitialFormData,
    );
    const [settings, setSettings] = useState<SettingsType>(SettingsInitialData);
    const [uploadProgress, setUploadProgress] = useState<number>(100);
    const [isBulkUploading, setIsBulkUploading] = useState<boolean>(false);
    //! **********************

    //! *** GET ALL COURSES, EDIT COURSE ***
    const { courseToEdit, setCourseToEdit, isEditing, setIsEditing } =
        useEditCourse(setCurriculumForm, setInfoForm, setSettings);
    const { courses, setCourses } = useFetchCourses(isEditing);
    //! **********************************
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
                isBulkUploading,
                setIsBulkUploading,
                infoForm,
                setInfoForm,
                courses,
                setCourses,
                courseToEdit,
                setCourseToEdit,
                isEditing,
                setIsEditing,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default InstructerProvider;

export const useInstructerContext = () => useContext(GlobalContext);
