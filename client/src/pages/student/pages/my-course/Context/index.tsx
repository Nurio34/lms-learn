import { createContext, useContext } from "react";
import useSideMenu from "./Hooks/useSideMenu";
import useCourse, { ProgressType } from "./Hooks/useCourse";
import { CourseType, LectureType } from "../../../../../types/course";
import useHeader from "./Hooks/useHeader";
import useComment, { CommentType } from "./Hooks/useComment";

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
    comments: CommentType[];
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
    sendComment: (comment: string) => Promise<void>;
    sendReply: (comment: string) => Promise<void>;
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
    const { comments, setComments, sendComment, sendReply } = useComment(
        myCourse._id,
        playingLecture?._id,
    );

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
                comments,
                setComments,
                sendComment,
                sendReply,
            }}
        >
            {children}
        </ProgressContext.Provider>
    );
}

export default ProgressContextProvider;

export const useProgressContext = () => useContext(ProgressContext);
