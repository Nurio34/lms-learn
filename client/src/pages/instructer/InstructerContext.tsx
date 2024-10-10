import { createContext, useContext, useEffect, useState } from "react";
import Dashboard from "./Components/Dashboard";
import {
    CurriculumFormInitialData,
    CurriculumFormType,
    InfoFormInitialFormData,
    InfoFormType,
    SettingsInitialData,
    SettingsType,
} from "../../config";
import { CourseType } from "../../Hooks/useCourse";
import axiosInstance from "../../../services/axios";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";

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
    courses: CourseType[];
    setCourses: React.Dispatch<React.SetStateAction<CourseType[]>>;
    courseToEdit: CourseType;
    setCourseToEdit: React.Dispatch<React.SetStateAction<CourseType>>;
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const GlobalContext = createContext({} as GlobalContextType);

function InstructerProvider({ children }: { children: JSX.Element }) {
    const [activeTab, setActiveTab] = useState<ActiveTabType>("dashboard");

    const [activeComponent, setActiveComponent] = useState<JSX.Element>(
        <Dashboard />,
    );
    const [curriculumForm, setCurriculumForm] = useState<CurriculumFormType>(
        CurriculumFormInitialData,
    );
    const [settings, setSettings] = useState<SettingsType>(SettingsInitialData);
    const [uploadProgress, setUploadProgress] = useState<number>(100);
    const [infoForm, setInfoForm] = useState<InfoFormType>(
        InfoFormInitialFormData,
    );

    //! ****
    const [courses, setCourses] = useState<CourseType[]>([] as CourseType[]);

    const location = useLocation();

    const fetchCourses = async () => {
        try {
            const response = await axiosInstance.get(`/course/get-courses`);
            setCourses(response.data.courses);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
            }
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [activeComponent, location.pathname]);

    //** ********************** */

    const [courseToEdit, setCourseToEdit] = useState<CourseType>(
        {} as CourseType,
    );
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (isEditing) {
            const lecturesToEdit = courseToEdit.lectures;
            setCurriculumForm(lecturesToEdit);
            setInfoForm({
                title: courseToEdit.title,
                category: courseToEdit.category,
                level: courseToEdit.level,
                primaryLanguage: courseToEdit.primaryLanguage,
                subtitle: courseToEdit.subtitle,
                description: courseToEdit.description,
                pricing: courseToEdit.pricing,
                objectives: courseToEdit.objectives,
                welcomeMessage: courseToEdit.welcomeMessage,
            });
            setSettings((prev) => ({
                ...prev,
                image: {
                    imageUrl: courseToEdit.image.imageUrl,
                    public_id: courseToEdit.image.public_id,
                    isFileLoading: false,
                },
            }));
        }
    }, [isEditing]);

    //** ********************** */

    //! ******

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
