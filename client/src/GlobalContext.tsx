import { createContext, useContext, useState } from "react";

export type UserType = {
    id: string;
    username: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
};

export const initialUser: UserType = {
    id: "",
    username: "",
    email: "",
    role: "",
    iat: 0,
    exp: 0,
};

type GlobalContextType = {
    authenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserType;
    setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const GlobalContext = createContext({} as GlobalContextType);

function GlobalProvider({ children }: { children: React.ReactNode }) {
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

export default GlobalProvider;