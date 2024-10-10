export type LectureType = {
    title: string;
    videoUrl: string;
    freePreview: boolean;
    public_id: string;
    isFileLoading: boolean;
    _id: string;
};

export type StudentType = {
    id: string;
    name: string;
    email: string;
};

export type CourseType = {
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
    students: StudentType[];
    _id: string;
    isPublished: boolean;
};

const useNewCourse = () => {};

export default useNewCourse;
