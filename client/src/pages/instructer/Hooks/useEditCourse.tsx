import { useEffect, useState } from "react";
import { CourseType } from "../../../Hooks/useInstructerActiveTab";
import {
    CurriculumFormType,
    InfoFormType,
    SettingsType,
} from "../../../config";

const useEditCourse = (
    setCurriculumForm: React.Dispatch<React.SetStateAction<CurriculumFormType>>,
    setInfoForm: React.Dispatch<React.SetStateAction<InfoFormType>>,
    setSettings: React.Dispatch<React.SetStateAction<SettingsType>>,
) => {
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
    return { courseToEdit, setCourseToEdit, isEditing, setIsEditing };
};

export default useEditCourse;
