import { createContext, useContext } from "react";
import useSideMenu from "./Hooks/useSideMenu";
import useCourse, { ProgressType } from "./Hooks/useCourse";
import { CourseType, LectureType } from "../../../../../types/course";
import useHeader from "./Hooks/useHeader";
import useComment from "./Hooks/useComment";

type ProgressContextType = {
    isLoading: boolean;
    error: string;
    myCourse: CourseType;
    progress: ProgressType;
    setMyCourseProgress: React.Dispatch<React.SetStateAction<ProgressType>>;
    isSideMenuOpen: boolean;
    toggleSideMenu: () => void;
    headerHeight: number;
    getHeaderHeight: (num: number) => void;
    playingLecture: LectureType | undefined;
    setPlayingLecture: React.Dispatch<
        React.SetStateAction<LectureType | undefined>
    >;
    isLastVideo: boolean;
    setIsLastVideo: React.Dispatch<React.SetStateAction<boolean>>;
    isCourseComplated: boolean;
    setIsCourseComplated: React.Dispatch<React.SetStateAction<boolean>>;
    resetProgress: () => Promise<void>;
    updatePlayingLecture: (index: number) => Promise<void>;
    isTextAreaFocused: boolean;
    setIsTextAreaFocused: React.Dispatch<React.SetStateAction<boolean>>;
    comment: string;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    indexToPutEmoji: number;
    setIndexToPutEmoji: React.Dispatch<React.SetStateAction<number>>;
    isAnyIndexSelected: boolean;
    setIsAnyIndexSelected: React.Dispatch<React.SetStateAction<boolean>>;
    clickCount: number;
    setClickCount: React.Dispatch<React.SetStateAction<number>>;
    isEmojiPickerOpen: boolean;
    setIsEmojiPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProgressContext = createContext({} as ProgressContextType);

type ProgressContextProviderType = {
    children: React.ReactNode;
};

function ProgressContextProvider({ children }: ProgressContextProviderType) {
    const {
        isLoading,
        error,
        myCourse,
        progress,
        setMyCourseProgress,
        playingLecture,
        setPlayingLecture,
        isLastVideo,
        setIsLastVideo,
        isCourseComplated,
        setIsCourseComplated,
        resetProgress,
        updatePlayingLecture,
    } = useCourse();
    const { isSideMenuOpen, toggleSideMenu } = useSideMenu();
    const { headerHeight, getHeaderHeight } = useHeader();
    const {
        isTextAreaFocused,
        setIsTextAreaFocused,
        comment,
        setComment,
        indexToPutEmoji,
        setIndexToPutEmoji,
        isAnyIndexSelected,
        setIsAnyIndexSelected,
        clickCount,
        setClickCount,
        isEmojiPickerOpen,
        setIsEmojiPickerOpen,
    } = useComment();
    return (
        <ProgressContext.Provider
            value={{
                isLoading,
                error,
                myCourse,
                progress,
                setMyCourseProgress,
                isSideMenuOpen,
                toggleSideMenu,
                headerHeight,
                getHeaderHeight,
                playingLecture,
                setPlayingLecture,
                isLastVideo,
                setIsLastVideo,
                isCourseComplated,
                setIsCourseComplated,
                resetProgress,
                updatePlayingLecture,
                isTextAreaFocused,
                setIsTextAreaFocused,
                comment,
                setComment,
                indexToPutEmoji,
                setIndexToPutEmoji,
                isAnyIndexSelected,
                setIsAnyIndexSelected,
                clickCount,
                setClickCount,
                isEmojiPickerOpen,
                setIsEmojiPickerOpen,
            }}
        >
            {children}
        </ProgressContext.Provider>
    );
}

export default ProgressContextProvider;

export const useProgressContext = () => useContext(ProgressContext);
