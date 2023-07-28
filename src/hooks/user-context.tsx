import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ILoginForm, ISession } from "../interfaces/user-interface";
import { endpoints } from "../settings/endpoint";
import Service from "../utils/service";
import useLoading from "./useLoading";

interface IUserContext {
    login: (_form: ILoginForm) => Promise<void>;
    isAuth: () => boolean;
    user: ISession | null;
    fetchUser: () => Promise<void>;
}

const userContext = createContext({} as IUserContext);

type ContentLayout = {
    children: JSX.Element;
};

export function UserProvider({ children }: ContentLayout) {
    const [user, setUser] = useState<ISession | null>(null);
    const { onStart, onFinish } = useLoading();
    const navigate = useNavigate();
    const service: Service = new Service(undefined, true);

    function isAuth() {
        return user === undefined || user === null || user === undefined;
    }

    useEffect(() => checkStorage(), []);

    const login = async (form: ILoginForm): Promise<void> => {
        const response = await service.request<ISession>(
            endpoints.auth.login,
            "",
            form
        );
        onStart("We're signed in you up...");
        if (!response.isError) {
            setUser(response.data as ISession);
            saveToStorage(response.data as ISession);
            onFinish("Successfully Logged In", !response.isError);
            navigate("/home");
        } else {
            onFinish(response.data as string, false);
        }

        // return response;
    };

    const checkStorage = () => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            setUser(JSON.parse(userStr) as ISession);
        }
    };
    const saveToStorage = (user: ISession) => {
        localStorage.setItem("user", JSON.stringify(user));
    };

    const fetchUser = async (): Promise<void> => {
        const response = await service.request<ISession>(
            endpoints.user.getProfileUser
        );
        if (!response.isError) setUser(response.data as ISession);
    };

    return (
        <userContext.Provider value={{ login, user, isAuth, fetchUser }}>
            {children}
        </userContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(userContext);
}
