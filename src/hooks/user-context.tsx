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
    refetchInfo: () => Promise<void>;
    bankInfo: IBackendAccount | null;
    fetchTransaction: (
        account?: IBackendAccount,
        filter?: undefined | "TRANSFER_IN" | "TRANSFER_OUT"
    ) => Promise<void>;
    transaction: IBackendTransaction | null;
    transactionLoading: boolean;
    accountLoading: boolean;
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
    const [accountLoading, setAccountLoading] = useState<boolean>(true);
    const [transactionLoading, setTransactionLoading] = useState<boolean>(true);
    const { onStart, onFinish } = useLoading();
    const navigate = useNavigate();
    const service: Service = new Service(undefined, true);

    function isAuth() {
        return user === undefined || user === null || user === undefined;
    }

    const refetchInfo = async () => {
        if (user && user.role !== "ADMIN") {
            const temp = await getBankInfo();
            setBankInfo(temp);
        }
    };

    useEffect(() => {
        refetchInfo();
    }, [user]);

    useEffect(() => checkStorage(), []);

    const register = async (form: IRegisterForm): Promise<void> => {
        const toastId = toastLoading("Kami sedang membuat akun anda");
        const response = await service.request<any>(
            endpoints.auth.register,
            undefined,
            form
        );
        if (response.success) {
            toastUpdateSuccess(toastId, "Berhasil membuat akun");

            navigate("/login");
        } else {
            toastUpdateFailed(toastId, response.errorMessage);
        }
    };

    const fetchTransaction = async (
        account?: IBackendAccount,
        filter?: undefined | "TRANSFER_IN" | "TRANSFER_OUT"
    ) => {
        setTransactionLoading(true);
        const temp = account ? account : bankInfo;
        if (user && temp) {
            const service = new Service(user.accessToken);
            const data = {
                accountNo: temp.accountNo,
                pageNumber: 1,
                transactionType: filter,
            };
            const response = await service.request<IBackendTransaction | null>(
                endpoints.user.getTransaction,
                undefined,
                data
            );
            setTransaction(response.data);
        }
        setTransactionLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    };

    const login = async (form: ILoginForm): Promise<void> => {
        const toastId = toastLoading("Mohon tunggu");
        const response = await service.request<ISession>(
            endpoints.auth.login,
            "",
            form
        );
        if (response.success) {
            saveToStorage(response.data);
            toastUpdateSuccess(toastId, "Berhasil masuk");
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
        setAccountLoading(true);
        if (user) {
            const service = new Service(user.accessToken);
            const response = await service.request<IBackendAccount>(
                endpoints.user.getBankAccount
            );
            fetchTransaction(response.data);
            setAccountLoading(false);
            return response.data;
        }
        setAccountLoading(false);
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
                await refetchInfo();
                toastSuccess(
                    `Berhasil transfer ke rekening ${receiverNumber} !`
                );
            }
        }
    };

    return (
        <userContext.Provider
            value={{
                accountLoading,
                transactionLoading,
                transaction,
                approve,
                logout,
                register,
                login,
                user,
                isAuth,
                fetchTransaction,
                fetchUser,
                bankInfo,
                refetchInfo,
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
