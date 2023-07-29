import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IApproveLoanApprovalForm,
  IGetLoanApproval,
} from '../interfaces/loan-interface';
import { endpoints } from '../settings/endpoint';
import { IParameter } from '../utils/parameter';
import Service from '../utils/service';
import useLoading from './useLoading';
import { useUserAuth } from './user-context';

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
      const parameters: IParameter[] = [{ name: 'user_id', value: user.uid }];
      const response = await service.request<any>(
        endpoints.loan.getAllLoan,
        undefined,
        undefined,
        parameters
      );
      setApprovalData(response.data);
    }
  };

  const approveLoan = async (data: IApproveLoanApprovalForm) => {
    onStart('Request');
    const service = new Service(user?.accessToken);
    const response = await service.request<any>(
      endpoints.loan.approveLoanApproval,
      '',
      data
    );

    if (response.success) {
      onFinish('Success Approve!');
      await getAllApproval();
    } else {
      onError(response.errorMessage);
    }
  };

  const handleDecline = (data: IApproveLoanApprovalForm) => {};

  return { getAllApproval, approvalData, approveLoan };
};
