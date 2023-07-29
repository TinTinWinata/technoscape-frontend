import { useEffect } from 'react';
import InsideLayout from '../../components/inside-layout';
import Navbar from '../../components/navbar';
import { useAdmin } from '../../hooks/useAdmin';
import { useUserAuth } from '../../hooks/user-context';
import { IApproveLoanApprovalForm } from '../../interfaces/loan-interface';

export function HomeAdmin() {
  const { user } = useUserAuth();
  const { getAllApproval, approvalData, approveLoan } = useAdmin();

  useEffect(() => {
    user && getAllApproval();
  }, [user]);

  const determineApproved = (isAprove: boolean | null) => {
    if (isAprove === null) return 'Peminjaman Diajukan';
    else if (isAprove === false) return 'Peminjaman Ditolak';
    else return 'Peminjaman Disetujui';
  };

  const handleApproveLoan = async (loan_approval_id: string) => {
    if (user) {
      const data: IApproveLoanApprovalForm = {
        loan_approval_id: loan_approval_id,
        user_id: user?.uid,
      };

      await approveLoan(data);
    }
  };

  return (
    <div className="w-full h-full relative">
      <Navbar></Navbar>
      <InsideLayout>
        <div className="flex flex-col w-full">
          {approvalData ? (
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
                        <th
                          colSpan={2}
                          scope="col"
                          className="relative px-6 py-4  font-bold text-xs uppercase"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {approvalData.map((data) => {
                        return (
                          <tr key={data.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {data.user_data.username}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {data.user_data.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {determineApproved(data.is_approved)}
                            </td>
                            {data.is_approved === null ? (
                              <>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <a
                                    href="#"
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    Decline
                                  </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button
                                    className="text-green-500 hover:text-green-700"
                                    onClick={() => handleApproveLoan(data.id)}
                                  >
                                    Approve
                                  </button>
                                </td>
                              </>
                            ) : null}
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
