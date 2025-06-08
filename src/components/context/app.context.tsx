import { createContext, useContext, useState } from "react";

interface IAppContext {
    isAuthenticated: boolean;
    setIsAuthenticated: (v: boolean) => void;
    setUser: (v: IUser) => void;
    user: IUser | null;
    isAppLoading: boolean;
    setIsAppLoading: (v: boolean) => void;
}
type TProps = {
    children: React.ReactNode;
};
const CurrentAppContext = createContext<IAppContext | null>(null);
export const AppProvider = (props: TProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

    return (
        <CurrentAppContext.Provider
            value={{
                isAuthenticated,
                user,
                setIsAuthenticated,
                setUser,
                isAppLoading,
                setIsAppLoading,
            }}
        >
            {props.children}
        </CurrentAppContext.Provider>
    );
};
export const useCurrentApp = () => {
    const currentAppContext = useContext(CurrentAppContext);

    if (!currentAppContext) {
        throw new Error(
            "useCurrentApp has to be used within <CurrentAppContext.Provider>"
        );
    }

    return currentAppContext;
};
