import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import useLoading from "./useLoading";
import { useNavigate } from "react-router-dom";
import Service from "../utils/service";
import { useUserAuth } from "./user-context";
import {
    IAcceptLoan,
    IGetLoan,
    IPayLoan,
    IRequestLoan,
    IRequestLoanForm,
} from "../interfaces/loan-interface";
import { IBackendInterface } from "../interfaces/backend/backend-response-interface";
import { endpoints } from "../settings/endpoint";
import { IParameter } from "../utils/parameter";

interface ILoanContext {
    createLoanApproval: (loanData: IRequestLoanForm) => Promise<void>;
    getLoan: () => Promise<IGetLoan | null>;
    loan: IGetLoan | null;
    payLoan: (loan: IPayLoan) => Promise<void>;
    acceptLoan: (approval: string) => Promise<void>;
}

const loanContext = createContext({} as ILoanContext);

type ContentLayout = {
    children: JSX.Element;
};

export function LoanProvider({ children }: ContentLayout) {
    const { user } = useUserAuth();
    const [loan, setLoan] = useState<IGetLoan | null>(null);
    const { onStart, onFinish } = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.role !== "ADMIN") getLoan();
    }, [user]);

    const createLoanApproval = async (
        loanData: IRequestLoanForm
    ): Promise<void> => {
        onStart("Request");
        const service = new Service(user?.accessToken);
        const response = await service.request<IRequestLoan>(
            endpoints.loan.crateLoanApproval,
            "",
            loanData
        );

        if (response.success) {
            console.log(response.data.prediction);
            if (response.data.prediction === 0) {
                onFinish("Pengajuan anda di tolak");
            } else {
                onFinish("Pengajuan berhasil", true);
            }
            navigate("/home");
        } else {
            onFinish(response.errorMessage, false);
        }
    };

    const acceptLoan = async (approval: string): Promise<void> => {
        onStart("Request");
        const service = new Service(user?.accessToken);
        console.log(user?.accessToken);
        console.log(approval);
        const response = await service.request<IBackendInterface<any>>(
            endpoints.loan.acceptLoan,
            "",
            { approval: approval }
        );
        if (response.success) {
            onFinish("Succesfully request", true);
            navigate("/home");
        } else {
            onFinish(response.errorMessage, false);
        }
    };
    const payLoan = async () => {
        return;
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
