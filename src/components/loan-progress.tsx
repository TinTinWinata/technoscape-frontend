import { Player } from '@lottiefiles/react-lottie-player';
import { ChangeEvent } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Skeleton from 'react-loading-skeleton';
import { useLoan } from '../hooks/loan-context';
import { IGetLoan } from '../interfaces/loan-interface';
import { dateAddDay, dateDifference } from '../utils/date-manipulation';
import {
  dateToStringFromNow,
  manipulateMoney,
} from '../utils/string-manipulation';
import Button from './button';

export function NoHaveLoan() {
  return (
    <div className="center text-center w-full h-full text-gray-400">
      Anda tidak memiliki pinjaman
    </div>
  );
}

export function LoanStillProgress() {
  return (
    <div className="w-2/3 center text-center  h-full text-gray-400">
      Peminjaman anda sedang dalam tahap approval
    </div>
  );
}
export function LoanNotApprovedByAI() {
  return (
    <div className="center text-center w-full h-full text-gray-400">
      Pengajuan peminjaman anda tidak diterima oleh kami
    </div>
  );
}

export function LoanNotApprovedByAdmin() {
  return (
    <div className="center text-center w-full h-full text-gray-400">
      Peminjaman anda ditolak oleh admin
    </div>
  );
}
interface ILoanApprovedProps {
  loan: IGetLoan;
}

export function LoanApproved({ loan }: ILoanApprovedProps) {
  const calculatePercentage = (): number => {
    if (loan && loan.loan_approval) {
      const endDate = dateAddDay(
        loan.loan_approval.created_at,
        loan.loan_approval.loan_days_term
      );
      const diff: number = dateDifference(
        loan.loan_approval.created_at,
        endDate
      );
      return (
        ((loan.loan_approval.loan_days_term - diff) /
          loan.loan_approval.loan_days_term) *
        100
      );
    }
    return 0;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <CircularProgressbar
        className="w-40 h-40 mt-3"
        value={calculatePercentage()}
        text={`${calculatePercentage()}%`}
        styles={buildStyles({
          textSize: '23px',
          pathTransitionDuration: 0.5,
          pathColor: `rgba(62, 152, 199, ${100})`,
          textColor: '#FFC144',
          trailColor: '#db9a16',
          backgroundColor: '#db9a16',
        })}
      />
      <div className="mt-4 text-center">
        <p className="font-semibold text-xl">
          {manipulateMoney(loan.loan_approval.loan_amount)}
        </p>
        <p className="text-gray-500 text-sm mt-3">
          You need to pay the loan
          <span className="ml-1">
            {dateToStringFromNow(
              dateAddDay(
                loan.loan_approval.created_at,
                loan.loan_approval.loan_days_term
              )
            )}
          </span>
        </p>
      </div>
    </div>
  );
}

interface ITakeLoanprops {
  handleAcceptLoan: (e: ChangeEvent<HTMLFormElement>) => Promise<void>;
  loan: IGetLoan;
}

export function TakeLoan({ handleAcceptLoan, loan }: ITakeLoanprops) {
  return (
    <div className="flex flex-col justify-center items-center">
      <form className="text-center" onSubmit={handleAcceptLoan}>
        <div className="center relative h-40">
          <div className="absolute w-full top-[30%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
            <Player
              src={'/animation/take-loan.json'}
              autoplay
              loop
              className="w-48 h-48"
            />
          </div>
        </div>
        <div className="text-sm text-gray-500 mb-2">
          Pinjaman anda sebesar{' '}
          {manipulateMoney(loan.loan_approval.loan_amount)} sudah di approve
          oleh kami!
        </div>
        <div className=""></div>
        <Button>Ambil</Button>
      </form>
    </div>
  );
}

export function AlreadyPayedLoan() {
  return (
    <div>
      <div className="h-[160px] w-full relative">
        <div className="abs-center w-52 h-52 ">
          <Player src={'/animation/smile.json'} autoplay loop />
        </div>
      </div>
      <div className="max-w-[250px] pb-2 text-center ">
        <p className="text-center text-lg font-bold text-gray-700">
          Terimakasih!
        </p>
        <p className="text-center text-sm text-gray-400">
          Pembayaran atas pinjaman anda sudah di bayar !
        </p>
      </div>
    </div>
  );
}

export function LoanProgress() {
  const { isLoading, loan, acceptLoan } = useLoan();

  const handleAcceptLoan = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loan) {
      await acceptLoan(loan?.loan_approval.id);
    }
  };
  return (
    <div className="w-full grow center">
      {isLoading && (
        <div className="w-full h-full">
          <Skeleton count={1} height={30} />
          <Skeleton count={1} height={320} />
        </div>
      )}
      {!isLoading && loan === null && <NoHaveLoan />}
      {loan &&
        loan.loan_approval &&
        loan.loan_approval.is_approved === null && <LoanStillProgress />}
      {loan && !loan.loan_approval && <LoanNotApprovedByAI />}
      {loan &&
        loan.loan_approval &&
        loan.loan_approval.is_approved === false && <LoanNotApprovedByAdmin />}
      {loan &&
        loan.loan_approval &&
        loan.loan_approval.is_approved === true &&
        loan.loan === null && (
          <TakeLoan handleAcceptLoan={handleAcceptLoan} loan={loan} />
        )}
      {loan &&
        loan.loan_approval &&
        loan.loan_approval.is_approved === true &&
        loan.loan !== null &&
        loan.loan.is_payed === false && <LoanApproved loan={loan} />}
      {loan &&
        loan.loan_approval &&
        loan.loan_approval.is_approved === true &&
        loan.loan !== null &&
        loan.loan.is_payed === true && <AlreadyPayedLoan />}
    </div>
  );
}
