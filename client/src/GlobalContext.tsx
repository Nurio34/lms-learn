import { createContext, useContext, useState } from "react";
import useInstructerActiveTab from "./Hooks/useInstructerActiveTab";
import { ActiveTabType } from "./pages/instructer/InstructerContext";

export type UserType = {
    id: string;
    username: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
    lastLoginDate: string;
};

export const initialUser: UserType = {
    id: "",
    username: "",
    email: "",
    role: "",
    iat: 0,
    exp: 0,
    lastLoginDate: "",
};

type GlobalContextType = {
    authenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserType;
    setUser: React.Dispatch<React.SetStateAction<UserType>>;
    activeComponent: JSX.Element;
    activeTab: ActiveTabType;
    setActiveComponent: React.Dispatch<React.SetStateAction<JSX.Element>>;
    setActiveTab: React.Dispatch<React.SetStateAction<ActiveTabType>>;
    headerHeight: number;
    setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
    isVideoComplated: boolean;
    setIsVideoComplated: React.Dispatch<React.SetStateAction<boolean>>;
};

const GlobalContext = createContext({} as GlobalContextType);

function GlobalProvider({ children }: { children: React.ReactNode }) {
    const tokenInStorage = sessionStorage.getItem("token");

    const token = JSON.parse(tokenInStorage!);

    const [authenticated, setAuthenticated] = useState<boolean>(
        token ? true : false,
    );

    const [user, setUser] = useState<UserType>(initialUser);

    const { activeComponent, activeTab, setActiveComponent, setActiveTab } =
        useInstructerActiveTab();

    const [headerHeight, setHeaderHeight] = useState<number>(0);

    const [isVideoComplated, setIsVideoComplated] = useState(false);

    return (
        <GlobalContext.Provider
            value={{
                authenticated,
                setAuthenticated,
                user,
                setUser,
                activeComponent,
                activeTab,
                setActiveComponent,
                setActiveTab,
                headerHeight,
                setHeaderHeight,
                isVideoComplated,
                setIsVideoComplated,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider;
