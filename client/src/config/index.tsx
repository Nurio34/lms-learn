export const languageOptions = [
    { id: "english", label: "English" },
    { id: "spanish", label: "Spanish" },
    { id: "french", label: "French" },
    { id: "german", label: "German" },
    { id: "chinese", label: "Chinese" },
    { id: "japanese", label: "Japanese" },
    { id: "korean", label: "Korean" },
    { id: "portuguese", label: "Portuguese" },
    { id: "arabic", label: "Arabic" },
    { id: "russian", label: "Russian" },
];

export const courseLevelOptions = [
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
];

export const courseCategories = [
    { id: "web-development", label: "Web Development" },
    { id: "backend-development", label: "Backend Development" },
    { id: "data-science", label: "Data Science" },
    { id: "machine-learning", label: "Machine Learning" },
    { id: "artificial-intelligence", label: "Artificial Intelligence" },
    { id: "cloud-computing", label: "Cloud Computing" },
    { id: "cyber-security", label: "Cyber Security" },
    { id: "mobile-development", label: "Mobile Development" },
    { id: "game-development", label: "Game Development" },
    { id: "software-engineering", label: "Software Engineering" },
];

export const InfoFormControls = [
    {
        name: "title",
        label: "Title",
        componentType: "input",
        type: "text",
        placeholder: "Enter course title",
    },
    {
        name: "category",
        label: "Category",
        componentType: "select",
        type: "text",
        placeholder: "",
        options: courseCategories,
    },
    {
        name: "level",
        label: "Level",
        componentType: "select",
        type: "text",
        placeholder: "",
        options: courseLevelOptions,
    },
    {
        name: "primaryLanguage",
        label: "Primary Language",
        componentType: "select",
        type: "text",
        placeholder: "",
        options: languageOptions,
    },
    {
        name: "subtitle",
        label: "Subtitle",
        componentType: "input",
        type: "text",
        placeholder: "Enter course subtitle",
    },
    {
        name: "description",
        label: "Description",
        componentType: "textarea",
        type: "text",
        placeholder: "Enter course description",
    },
    {
        name: "pricing",
        label: "Pricing",
        componentType: "input",
        type: "number",
        placeholder: "Enter course pricing",
    },
    {
        name: "objectives",
        label: "Objectives",
        componentType: "textarea",
        type: "text",
        placeholder: "Enter course objectives",
    },
    {
        name: "welcomeMessage",
        label: "Welcome Message",
        componentType: "textarea",
        placeholder: "Welcome message for students",
    },
];

export type InfoFormType = {
    [key: string]: string; // This allows any string key with a string value
};

export const InfoFormInitialFormData = {
    title: "React.js",
    category: "Web Development",
    level: "Beginner",
    primaryLanguage: "1",
    subtitle: "English",
    description: "This course is beginner level friendly React.js course.",
    pricing: "20",
    objectives:
        "You will be able to understand my intermediate level React.js course.",
    welcomeMessage: "Welceome",
};

export type CurriculumFormType = {
    title: string;
    videoUrl: string;
    freePreview: boolean;
    public_id: string;
    isFileLoading: boolean;
}[];

export const CurriculumFormInitialData = [
    {
        title: "Fundementals",
        videoUrl:
            "https://res.cloudinary.com/dmvfabr5i/video/upload/v1728488874/oi2lrmx2aypirrbbwtcu.mp4",
        freePreview: false,
        public_id: "oi2lrmx2aypirrbbwtcu",
        isFileLoading: false,
    },
    {
        title: "useState",
        videoUrl:
            "https://res.cloudinary.com/dmvfabr5i/video/upload/v1728488888/chhjppwaxvxe4b4lv2dg.mp4",
        freePreview: false,
        public_id: "chhjppwaxvxe4b4lv2dg",
        isFileLoading: false,
    },
    {
        title: "useEffect",
        videoUrl:
            "https://res.cloudinary.com/dmvfabr5i/video/upload/v1728488911/sxtcjbrqrqgolugo5vfg.mp4",
        freePreview: false,
        public_id: "sxtcjbrqrqgolugo5vfg",
        isFileLoading: false,
    },
    {
        title: "useContext",
        videoUrl:
            "https://res.cloudinary.com/dmvfabr5i/video/upload/v1728488934/mcmu74y3ys0fs82vkrmn.mp4",
        freePreview: false,
        public_id: "mcmu74y3ys0fs82vkrmn",
        isFileLoading: false,
    },
];

export type SettingsType = {
    image: {
        isFileLoading: boolean;
        imageUrl: string;
        public_id: string;
    };
};

export const SettingsInitialData = {
    image: {
        isFileLoading: false,
        imageUrl:
            "https://res.cloudinary.com/dmvfabr5i/image/upload/v1728488784/i2cmcogrv9szqkreosfd.jpg",
        public_id: "i2cmcogrv9szqkreosfd",
    },
};

export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
];

export const filterOptions = {
    category: courseCategories,
    level: courseLevelOptions,
    primaryLanguage: languageOptions,
};
