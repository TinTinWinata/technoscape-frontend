import { ChangeEvent } from 'react';
import { InsideForm } from '../components/inside-form';
import Navbar from '../components/navbar';
import { useLoan } from '../hooks/loan-context';
import { useUserAuth } from '../hooks/user-context';
import { IRequestLoanForm } from '../interfaces/loan-interface';
import { manipulateRangeLoan } from '../utils/string-manipulation';

export const RequestLoan = () => {
  const { user } = useUserAuth();
  const { createLoanApproval } = useLoan();

  const requestLoan = async (e: ChangeEvent<HTMLFormElement>) => {
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
      <InsideForm
        title="Permintaan Peminjaman"
        subTitle="Pinjaman Cepat & Mudah untuk Kebutuhan Anda"
        onSubmit={requestLoan}
        buttonTitle="Minta Peminjaman"
      >
        <div className="flex flex-col mt-7 gap-2">
          <label htmlFor="amount" className="font-bold text-font">
            Jumlah
          </label>
          <input
            name="loan_amount"
            type="number"
            className="rounded-md focus:outline-none py-2 px-4 border border-gray-500 border-opacity-30"
          />
        </div>
        <div className="flex flex-col mb-4 mt-7 gap-2">
          <label htmlFor="range" className="font-bold text-font">
            Rentang Peminjaman
          </label>
          <select
            name="loan_days_term"
            id=""
            className="rounded-md focus:outline-none py-2 px-4 border border-gray-500 border-opacity-30"
          >
            <option value="6">6 bulan</option>
            <option value="9">9 bulan</option>
            <option value="12">12 bulan</option>
          </select>
        </div>
      </InsideForm>
    </div>
  );
};
