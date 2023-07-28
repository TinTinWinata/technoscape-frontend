import { useEffect } from 'react';
import { useLoan } from '../hooks/loan-context';
import { useUserAuth } from '../hooks/user-context';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { dateAddDay, dateDifference } from '../utils/date-manipulation';
import {
  dateToStringFromNow,
  manipulateMoney,
} from '../utils/string-manipulation';

export function LoanProgress() {
  const { getLoan, loan, acceptLoan, payLoan } = useLoan();
  const { user } = useUserAuth();

  useEffect(() => {
    getLoan && getLoan();
  }, [user]);

  const handleAcceptLoan = async () => {
    if (loan) {
      await acceptLoan(loan?.loan_approval.id);
    }
  };

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
      console.log(diff / loan.loan_approval.loan_days_term);
      return (
        ((loan.loan_approval.loan_days_term - diff) /
          loan.loan_approval.loan_days_term) *
        100
      );
    }
    return 0;
  };

  return (
    <div>
      {loan && loan.loan_approval && (
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
      )}
      {/* {loan && (
          <div>
            <p>{loan.loan_approval.id}</p>
            {loan.loan_approval.is_approved && (
              <button onClick={handleAcceptLoan}>Accept</button>
            )}
          </div>
        )} */}
    </div>
  );
}
