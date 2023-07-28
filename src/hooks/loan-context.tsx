import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    IAcceptLoan,
    IGetLoan,
    IPayLoan,
    IRequestLoan,
    IRequestLoanForm,
} from "../interfaces/loan-interface";
import { IBackendInterface } from "../interfaces/backend/backend-response-interface";
import { endpoints } from "../settings/endpoint";
import {
    toastError,
    toastLoading,
    toastUpdateFailed,
    toastUpdateSuccess,
} from "../settings/toast-setting";

import { useUserAuth } from "./user-context";
import { IParameter } from "../utils/parameter";
import Service from "../utils/service";
import useLoading from "./useLoading";

interface ILoanContext {
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
    const { user } = useUserAuth();
    const [loan, setLoan] = useState<IGetLoan | null>(null);
    console.log(loan);
    const { onStart, onFinish } = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        getLoan();
    }, [user]);

    const createLoanApproval = async (
        loanData: IRequestLoanForm
    ): Promise<void> => {
        onStart("Request");
        const service = new Service(user?.accessToken);
        const response = await service.request<IBackendInterface<any>>(
            endpoints.loan.crateLoanApproval,
            "",
            loanData
        );

        if (response.success) {
            onFinish("Succesfully request", true);
            navigate("/home");
        } else {
            onFinish(response.errorMessage, false);
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
        } else {
            onFinish(response.errorMessage, false);
        }
    };
    const payLoan = async () => {
        if (loan) {
            const toastId = toastLoading(
                "Please wait we're checking your account."
            );
            const data = {
                loan: loan.loan.id,
            };
            const service = new Service();
            const response = await service.request<any>(
                endpoints.loan.payLoan,
                undefined,
                data
            );
            if (response.success) {
                getLoan();
                navigate("/home");
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
            setLoan(response.data);
            return response.data;
        }
        return null;
    };

    return (
        <loanContext.Provider
            value={{ createLoanApproval, getLoan, loan, acceptLoan, payLoan }}
        >
            {children}
        </loanContext.Provider>
    );
}

export function useLoan() {
    return useContext(loanContext);
}
