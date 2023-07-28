import { useEffect } from "react";
import Navbar from "../../components/navbar";
import { useUserAuth } from "../../hooks/user-context";
import { useAdmin } from "../../hooks/useAdmin";
import { IApproveLoanApprovalForm } from "../../interfaces/loan-interface";

export function HomeAdmin() {
    const { user } = useUserAuth();
    const { getAllApproval, approvalData, approveLoan } = useAdmin();

    useEffect(() => {
        user && getAllApproval();
    }, [user]);

    const determineApproved = (isAprove: boolean | null) => {
        if (isAprove === null) return "Peminjaman Diajukan";
        else if (isAprove === false) return "Peminjaman Ditolak";
        else return "Peminjaman Disetujui";
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
            <div className="flex justify-center absolute top-20 w-full z-10 ">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                {approvalData && (
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Email
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Status
                                                </th>
                                                <th
                                                    colSpan={2}
                                                    scope="col"
                                                    className="relative px-6 py-3"
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
                                                            {
                                                                data.user_data
                                                                    .username
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {
                                                                data.user_data
                                                                    .email
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {determineApproved(
                                                                data.is_approved
                                                            )}
                                                        </td>
                                                        {data.is_approved ===
                                                        null ? (
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
                                                                    <a
                                                                        href="#"
                                                                        className="text-green-500 hover:text-green-700"
                                                                        onClick={() =>
                                                                            handleApproveLoan(
                                                                                data.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Approve
                                                                    </a>
                                                                </td>
                                                            </>
                                                        ) : null}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
