import { createContext, useContext } from "react";
import useSideMenu from "./Hooks/useSideMenu";
import useCourse, { ProgressType } from "./Hooks/useCourse";
import { CourseType } from "../../../../../types/course";
import useHeader from "./Hooks/useHeader";

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
};

const ProgressContext = createContext({} as ProgressContextType);

type ProgressContextProviderType = {
    children: React.ReactNode;
};

function ProgressContextProvider({ children }: ProgressContextProviderType) {
    const { isLoading, error, myCourse, progress, setMyCourseProgress } =
        useCourse();
    const { isSideMenuOpen, toggleSideMenu } = useSideMenu();
    const { headerHeight, getHeaderHeight } = useHeader();

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
            }}
        >
            {children}
        </ProgressContext.Provider>
    );
}

export default ProgressContextProvider;

export const useProgressContext = () => useContext(ProgressContext);
