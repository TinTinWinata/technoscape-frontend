import { useContext } from "react";
import { createContext } from "react";
import useLoading from "./useLoading";
import { useNavigate } from "react-router-dom";
import Service from "../utils/service";
import { useUserAuth } from "./user-context";
import { IGetLoan, IRequestLoanForm } from "../interfaces/loan-interface";
import { IBackendInterface } from "../interfaces/backend/backend-response-interface";
import { endpoints } from "../settings/endpoint";
import { IParameter } from "../utils/parameter";

interface ILoanContext {
    createLoanApproval: (loanData: IRequestLoanForm) => Promise<void>;
    getLoan: () => Promise<IGetLoan>;
}

const loanContext = createContext({} as ILoanContext);

type ContentLayout = {
    children: JSX.Element;
};

export function LoanProvider({ children }: ContentLayout) {
    const { user } = useUserAuth();
    const { onStart, onFinish } = useLoading();
    const navigate = useNavigate();

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

    const getLoan = async (): Promise<IGetLoan> => {
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
        console.log(response.data);
        return response.data;
    };

    return (
        <loanContext.Provider value={{ createLoanApproval, getLoan }}>
            {children}
        </loanContext.Provider>
    );
}

export function useLoan() {
    return useContext(loanContext);
}
