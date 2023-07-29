import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IBackendInterface } from "../interfaces/backend/backend-response-interface";
import {
    IGetLoan,
    IRequestLoan,
    IRequestLoanForm,
} from "../interfaces/loan-interface";
import { endpoints } from "../settings/endpoint";
import {
    toastError,
    toastLoading,
    toastUpdateFailed,
    toastUpdateSuccess,
} from "../settings/toast-setting";

import { IParameter } from "../utils/parameter";
import Service from "../utils/service";
import { isEmptyObject } from "../utils/validator";
import useLoading from "./useLoading";
import { useUserAuth } from "./user-context";

interface ILoanContext {
    isLoading: boolean;
    createLoanApproval: (loanData: IRequestLoanForm) => Promise<void>;
    getLoan: () => Promise<IGetLoan | null>;
    loan: IGetLoan | null;
    payLoan: () => Promise<void>;
    acceptLoan: (approval: string) => Promise<void>;
}

const loanContext = createContext({} as ILoanContext);

type ContentLayout = {
    children: JSX.Element;
};

export function LoanProvider({ children }: ContentLayout) {
    const { user, refetchInfo } = useUserAuth();
    const [loan, setLoan] = useState<IGetLoan | null>(null);
    const { onStart, onFinish } = useLoading();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (user && user.role !== "ADMIN") getLoan();
    }, [user]);

    const createLoanApproval = async (
        loanData: IRequestLoanForm
    ): Promise<void> => {
        const toastId = toastLoading("Mohon ditunggu");
        const service = new Service(user?.accessToken);
        const response = await service.request<IRequestLoan>(
            endpoints.loan.crateLoanApproval,
            "",
            loanData
        );
        if (response.success) {
            if (response.data.prediction === 1) {
                toastUpdateSuccess(
                    toastId,
                    "Pengajuan anda diterima & sedang di proses"
                );
            } else {
                toastUpdateFailed(toastId, "Pengajuan anda ditolak!");
            }
            getLoan();
            navigate("/home");
        } else {
            toastUpdateFailed(toastId, response.errorMessage);
        }
    };

    const acceptLoan = async (approval: string): Promise<void> => {
        onStart("Mengambil pinjaman...");
        const service = new Service(user?.accessToken);
        const response = await service.request<IBackendInterface<any>>(
            endpoints.loan.acceptLoan,
            "",
            { approval: approval }
        );
        if (response.success) {
            getLoan();
            onFinish("Succesfully request", true);
            refetchInfo();
        } else {
            onFinish(response.errorMessage, false);
        }
    };
    const payLoan = async () => {
        if (loan && user) {
            const toastId = toastLoading(
                "Please wait we're checking your account."
            );
            const data = {
                loan: loan.loan.id,
            };
            const service = new Service(user.accessToken);
            const response = await service.request<any>(
                endpoints.loan.payLoan,
                undefined,
                data
            );
            if (response.success) {
                getLoan();
                navigate("/home");
                refetchInfo();
                toastUpdateSuccess(toastId, "Succesfully pay the loan!");
            } else {
                toastUpdateFailed(toastId, "Failed to pay the loan!");
            }
        } else {
            toastError("You dont have any loan in the database");
        }
    };

    const getLoan = async (): Promise<IGetLoan | null> => {
        if (user) {
            setLoading(true);
            const service = new Service(user?.accessToken);
            const parameters: IParameter[] = [
                { name: "user_id", value: user?.uid },
            ];
            const response = await service.request<any>(
                endpoints.loan.getLoan,
                undefined,
                "",
                parameters
            );
            console.log(user);
            console.log(response.data);
            if (!isEmptyObject(response.data)) {
                setLoan(response.data);
            }
            setLoading(false);
            return response.data;
        }
        setLoading(false);
        return null;
    };

    return (
        <loanContext.Provider
            value={{
                isLoading,
                createLoanApproval,
                getLoan,
                loan,
                acceptLoan,
                payLoan,
            }}
        >
            {children}
        </loanContext.Provider>
    );
}

export function useLoan() {
    return useContext(loanContext);
}
