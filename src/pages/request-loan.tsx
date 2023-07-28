import { ChangeEvent } from "react";
import Button, { ButtonType } from "../components/button";
import Navbar from "../components/navbar";
import { FcMultipleDevices } from "react-icons/fc";
import { IRequestLoanForm } from "../interfaces/loan-interface";
import { useUserAuth } from "../hooks/user-context";
import { useLoan } from "../hooks/loan-context";
import { manipulateRangeLoan } from "../utils/stringManipulation";

export const RequestLoan = () => {
    const { user } = useUserAuth();
    const { createLoanApproval } = useLoan();

    const handleRequestLoan = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;
        const { loan_amount, loan_days_term } = e.target;
        const loanData: IRequestLoanForm = {
            loan_amount: loan_amount.value,
            loan_days_term: manipulateRangeLoan(loan_days_term.value),
            user: user.uid,
        };
        await createLoanApproval(loanData);
    };

    return (
        <div className="w-full h-full relative">
            <Navbar />
            <div className="flex justify-center absolute top-20 w-full z-10 ">
                <div className="w-[80%] bg-white d-flex rounded-2xl shadow-2xl p-8">
                    <div className="w-full flex flex-row justify-between pb-4 border-b border-gray-500">
                        <div>
                            <p className="font-bold text-4xl text-font">
                                Request Loan
                            </p>
                            <p className="font-secondaryFont">
                                Quick & Easy Loans for Your Needs
                            </p>
                        </div>
                        <div className="flex justify-center items-center">
                            <FcMultipleDevices className="w-14 h-14 bg-green" />
                        </div>
                    </div>
                    <form onSubmit={handleRequestLoan}>
                        <div className="flex flex-col mt-4 gap-2">
                            <label
                                htmlFor="amount"
                                className="font-bold text-font"
                            >
                                Amount
                            </label>
                            <input
                                name="loan_amount"
                                type="number"
                                className="rounded p-2 border border-gray-500"
                            />
                        </div>
                        <div className="flex flex-col my-4 gap-2">
                            <label
                                htmlFor="range"
                                className="font-bold text-font"
                            >
                                Loan Range
                            </label>
                            <select
                                name="loan_days_term"
                                id=""
                                className="rounded p-2 border border-gray-500"
                            >
                                <option value="6">6 bulan</option>
                                <option value="9">9 bulan</option>
                                <option value="12">12 bulan</option>
                            </select>
                        </div>
                        <Button buttonType={ButtonType.Active} className="mt-4">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
