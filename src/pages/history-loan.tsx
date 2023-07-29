import { useEffect, useState } from 'react';
import InsideLayout from '../components/inside-layout';
import Navbar from '../components/navbar';
import useLoanHistory from '../hooks/useLoanHistory';
import { useUserAuth } from '../hooks/user-context';
import { ILoanHistory } from '../interfaces/loan-interface';
import { dateToString } from '../utils/string-manipulation';

export function LoanHistory() {
  const [loan, setLoan] = useState<ILoanHistory[]>([]);
  const { fetch: fetchLoan } = useLoanHistory();
  const { user } = useUserAuth();

  const fetch = async () => {
    const temp = await fetchLoan();
    if (temp) {
      setLoan(temp);
    }
  };

  useEffect(() => {
    fetch();
  }, [user]);

  return (
    <div className="w-full h-full relative">
      <Navbar></Navbar>
      <InsideLayout>
        <div className="center aw-full">
          {loan.length > 0 ? (
            <div className="w-full  overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow-md overflow-hidden border-b border-gray-100 sm:rounded">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white text-gray-700 ">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider"
                        >
                          Start Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-bold  uppercase tracking-wider"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-bold  uppercase tracking-wider"
                        >
                          Account Number
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-bold  uppercase tracking-wider"
                        >
                          Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loan.map((data) => {
                        return (
                          <tr key={data.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {dateToString(data.loan_approval_data.created_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {data.loan_approval_data.loan_amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {data.loan_approval_data.loan_days_term}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {data.loan_approval_data.receiverAccountNo}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {data.loan_approval_data.rate}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full p-5 rounded-lg shadow-md bg-white">
              <p className="text-gray-500 text-center text-sm">
                - Anda tidak memiliki peminjaman yang sudah selesai -{' '}
              </p>
            </div>
          )}
        </div>
      </InsideLayout>
    </div>
  );
}
