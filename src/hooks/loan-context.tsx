import { useContext } from "react";
import { createContext } from "react";
import useLoading from "./useLoading";
import { useNavigate } from "react-router-dom";
import Service from "../utils/service";
import { useUserAuth } from "./user-context";
import { IRequestLoanForm } from "../interfaces/loan-interface";
import { IBackendInterface } from "../interfaces/backend/backend-response-interface";
import { endpoints } from "../settings/endpoint";

interface ILoanContext {
    createLoanApproval: (loanData: IRequestLoanForm) => Promise<void>;
}

const loanContext = createContext({} as ILoanContext);

type ContentLayout = {
    children: JSX.Element;
};

export function LoanProvider({ children }: ContentLayout) {
    // const { user } = useUserAuth();
    const { onStart, onFinish } = useLoading();
    const navigate = useNavigate();
    const service: Service = new Service(undefined, true);

    const createLoanApproval = async (
        loanData: IRequestLoanForm
    ): Promise<void> => {
        console.log("tester");
        onStart("Request");
        const response = await service.request<IBackendInterface<any>>(
            endpoints.loan.crateLoanApproval,
            "",
            loanData
        );

        console.log(response);

        if (response.success) {
            onFinish("Succesfully request", true);
            navigate("/home");
        } else {
            onFinish(response.errorMessage, false);
        }
    };

    return (
        <loanContext.Provider value={{ createLoanApproval }}>
            {children}
        </loanContext.Provider>
    );
}

export function useLoan() {
    return useContext(loanContext);
}
