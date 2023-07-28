import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ILoginForm } from "../interfaces/backend/login-form-interface";
import { IRegisterForm } from "../interfaces/backend/register-form-interface";
import { IBackendAccount } from "../interfaces/bank-account-interface";
import { IBackendTransaction } from "../interfaces/transaction-interface";
import { ISession } from "../interfaces/user-interface";
import { endpoints } from "../settings/endpoint";
import {
    toastError,
    toastLoading,
    toastSuccess,
    toastUpdateFailed,
    toastUpdateSuccess,
} from "../settings/toast-setting";
import Service from "../utils/service";
import useLoading from "./useLoading";

interface IUserContext {
    logout: () => void;
    approve: () => void;
    login: (form: ILoginForm) => Promise<void>;
    isAuth: () => boolean;
    user: ISession | null;
    register: (form: IRegisterForm) => Promise<void>;
    fetchUser: () => Promise<void>;
    bankInfo: IBackendAccount | null;
    transaction: IBackendTransaction | null;
    transfer: (receiverNumber: number, amount: number) => Promise<void>;
}

const userContext = createContext({} as IUserContext);

type ContentLayout = {
    children: JSX.Element;
};

export function UserProvider({ children }: ContentLayout) {
    const [user, setUser] = useState<ISession | null>(null);
    const [bankInfo, setBankInfo] = useState<IBackendAccount | null>(null);
    const [transaction, setTransaction] = useState<IBackendTransaction | null>(
        null
    );
    const { onStart, onFinish } = useLoading();
    const navigate = useNavigate();
    const service: Service = new Service(undefined, true);

    function isAuth() {
        return user === undefined || user === null || user === undefined;
    }

    const checkInfo = async () => {
        const temp = await getBankInfo();
        setBankInfo(temp);
        await fetchTransaction();
    };

    useEffect(() => {
        checkInfo();
    }, [user]);

    useEffect(() => checkStorage(), []);

    const register = async (form: IRegisterForm): Promise<void> => {
        const toastId = toastLoading("We creating your account");
        const response = await service.request<any>(
            endpoints.auth.register,
            undefined,
            form
        );
        if (response.success) {
            toastUpdateSuccess(toastId, "Succesfuly register account");

            navigate("/login");
        } else {
            toastUpdateFailed(toastId, response.errorMessage);
        }
    };

    const fetchTransaction = async () => {
        if (user && bankInfo) {
            const service = new Service(user.accessToken);
            const data = {
                accountNo: bankInfo.accountNo,
                pageNumber: 1,
            };
            const response = await service.request<IBackendTransaction | null>(
                endpoints.user.getTransaction,
                undefined,
                data
            );
            setTransaction(response.data);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    };

    const login = async (form: ILoginForm): Promise<void> => {
        const toastId = toastLoading("We were signing you up");
        const response = await service.request<ISession>(
            endpoints.auth.login,
            "",
            form
        );
        if (response.success) {
            saveToStorage(response.data);
            toastUpdateSuccess(toastId, "Succesfully Login");
            if (response.data.role === "ADMIN") {
                navigate("/admin/home");
            } else {
                navigate("/home");
            }
        } else {
            toastUpdateFailed(toastId, response.errorMessage);
        }
    };

    const checkStorage = () => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            setUser(JSON.parse(userStr) as ISession);
        }
    };
    const saveToStorage = (user: ISession) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const approve = () => {
        const tempUser = { ...user } as ISession;
        tempUser.is_approved = true;
        saveToStorage(tempUser);
    };

    const fetchUser = async (): Promise<void> => {
        const response = await service.request<ISession>(
            endpoints.user.getProfileUser
        );
    };

    const getBankInfo = async (): Promise<IBackendAccount | null> => {
        if (user) {
            const service = new Service(user.accessToken);
            const response = await service.request<IBackendAccount>(
                endpoints.user.getBankAccount
            );
            return response.data;
        }
        return null;
    };

    const transfer = async (receiverNumber: number, amount: number) => {
        if (user && bankInfo) {
            const service = new Service(user.accessToken);
            const data = {
                senderAccountNo: bankInfo.accountNo,
                receiverAccountNo: receiverNumber,
                amount,
            };
            const response = await service.request<any>(
                endpoints.user.createTransaction,
                undefined,
                data
            );
            if (!response.success) toastError(response.errorMessage);
            else {
                await checkInfo();
                toastSuccess(
                    `Succesfully transfer to ${receiverNumber} account!`
                );
            }
        }
    };

    return (
        <userContext.Provider
            value={{
                transaction,
                approve,
                logout,
                register,
                login,
                user,
                isAuth,
                fetchUser,
                bankInfo,
                transfer,
            }}
        >
            {children}
        </userContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(userContext);
}
