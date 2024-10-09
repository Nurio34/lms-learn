export type LectureType = {
    title: string;
    videoUrl: string;
    freePreview: boolean;
    public_id: string;
    isFileLoading: boolean;
    id: string;
};

export type NewCourseType = {
    instructerId: string;
    instructerName: string;
    lectures: LectureType[];
    title: string;
    category: string;
    level: string;
    primaryLanguage: string;
    subtitle: string;
    description: string;
    pricing: string;
    objectives: string;
    welcomeMessage: string;
    image: {
        imageUrl: string;
        public_id: string;
        _id: string;
    };
    students: [];
    id: string;
};

const useNewCourse = () => {};

export default useNewCourse;
