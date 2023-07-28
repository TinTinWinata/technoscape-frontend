import { useState } from "react";
import {
    IApproveLoanApprovalForm,
    IGetLoanApproval,
} from "../interfaces/loan-interface";
import { ISession } from "../interfaces/user-interface";
import { endpoints } from "../settings/endpoint";
import Service from "../utils/service";
import { useUserAuth } from "./user-context";
import useLoading from "./useLoading";
import { Navigate, useNavigate } from "react-router-dom";

export const useAdmin = () => {
    const { user } = useUserAuth();
    const { onStart, onFinish, onError } = useLoading();
    const navigate = useNavigate();

    const [approvalData, setApprovalData] = useState<IGetLoanApproval[] | null>(
        null
    );

    const getAllApproval = async (): Promise<void> => {
        if (user) {
            const service = new Service(user?.accessToken);
            const response = await service.request<any>(
                endpoints.loan.getAllLoan,
                undefined,
                { user_id: user.uid }
            );
            setApprovalData(response.data);
        }
    };

    const approveLoan = async (data: IApproveLoanApprovalForm) => {
        onStart("Request");
        const service = new Service(user?.accessToken);
        const response = await service.request<any>(
            endpoints.loan.approveLoanApproval,
            "",
            data
        );

        if (response.success) {
            onFinish("Success Approve!");
            await getAllApproval();
        } else {
            onError(response.errorMessage);
        }
    };

    const handleDecline = (data: IApproveLoanApprovalForm) => {};

    return { getAllApproval, approvalData, approveLoan };
};
