import { IGetLoanApproval } from '../interfaces/loan-interface';
import { endpoints } from '../settings/endpoint';
import { IParameter } from '../utils/parameter';
import Service from '../utils/service';
import { useUserAuth } from './user-context';

export default function useLoanHistory() {
  const { user } = useUserAuth();
  const fetch = async (): Promise<IGetLoanApproval[] | null> => {
    if (user) {
      const service = new Service();
      const parameters: IParameter[] = [{ name: 'user_id', value: user.uid }];
      const response = await service.request<IGetLoanApproval[] | null>(
        endpoints.loan.getAllLoan,
        undefined,
        undefined,
        parameters
      );
      return response.data;
    }
    return null;
  };
  return { fetch };
}
