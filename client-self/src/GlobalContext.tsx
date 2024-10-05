import { createContext, ReactNode, useContext, useState } from "react";

type UserType = {
    username: string;
    email: string;
    role: "student" | "instructer" | null;
    exp: number;
    iat: number;
};

type GlobalContextType = {
    authenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserType;
    setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const initialUser = {
    username: "",
    email: "",
    role: null,
    exp: 0,
    iat: 0,
};

const GlobalContext = createContext({} as GlobalContextType);

function GlobalContextProvider({ children }: { children: ReactNode }) {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserType>(initialUser);

    return (
        <GlobalContext.Provider
            value={{ authenticated, setAuthenticated, user, setUser }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContextProvider;
