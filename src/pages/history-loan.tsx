import { useEffect, useState } from 'react';
import InsideLayout from '../components/inside-layout';
import Navbar from '../components/navbar';
import useLoanHistory from '../hooks/useLoanHistory';
import { useUserAuth } from '../hooks/user-context';
import { IGetLoanApproval } from '../interfaces/loan-interface';

export function LoanHistory() {
  const [loan, setLoan] = useState<IGetLoanApproval[]>([]);
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
        <div className="flex flex-col w-full">
          {loan ? (
            <div className="w-full -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow-md overflow-hidden border-b border-gray-100 sm:rounded">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white text-gray-700 ">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loan.map((data) => {
                        return (
                          <tr key={data.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {data.user_data.username}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {data.user_data.email}
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
                - Tidak memiliki approval untuk ditampilkan -{' '}
              </p>
            </div>
          )}
        </div>
      </InsideLayout>
    </div>
  );
}
