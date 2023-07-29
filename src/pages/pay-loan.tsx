import { Player } from '@lottiefiles/react-lottie-player';
import { ChangeEvent, useEffect } from 'react';
import Button from '../components/button';
import { InsideForm } from '../components/inside-form';
import Navbar from '../components/navbar';
import { useLoan } from '../hooks/loan-context';
import { usePin } from '../hooks/pin-context';
import { dateAddDay, dateDifference } from '../utils/date-manipulation';
import { manipulateMoney } from '../utils/string-manipulation';

export default function PayLoan() {
  const { payLoan, loan } = useLoan();
  const { triggerPin } = usePin();

  useEffect(() => {
    triggerPin();
  }, []);
  const handlePayloan = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    payLoan();
  };

  const calculateTotal = () => {
    if (!loan) return 0;
    return loan.loan_approval.loan_amount;
  };

  return (
    <div className="w-full h-full relative">
      <Navbar />
      <InsideForm
        title="Bayar Peminjaman"
        subTitle="Pinjaman Cepat & Mudah untuk Kebutuhan Anda"
        onSubmit={handlePayloan}
      >
        <div className="flex pt-10">
          <div className="grow">
            <div className="flex justify-between px-3 pt-3">
              <div className="font-bold">Akun</div>
              <div className=""></div>
              {loan && (
                <div className="font-bold text-green-400">
                  {Math.floor(
                    dateDifference(
                      new Date(),
                      dateAddDay(
                        loan.loan_approval.created_at,
                        loan.loan_approval.loan_days_term
                      )
                    )
                  )}
                  <span className="ml-0.5"> Hari</span>
                </div>
              )}
            </div>
            <div className="flex justify-between px-3 pb-3">
              <div className="text-gray-500">
                {loan?.loan_approval.receiverAccountNo}
              </div>
              <div className=""></div>
              {loan?.loan_approval.loan_amount && (
                <div className="font-bold text-xl">
                  {manipulateMoney(loan.loan_approval.loan_amount)}
                </div>
              )}
            </div>
            <hr className="w-full border border-opacity-50" />
          </div>
          <div className="w-[30%]  mx-10 rounded-lg custom-shadow-2 ">
            <div className="relative overflow-hidden w-full h-32">
              <div className=" absolute w-full h-full left-[50%] translate-x-[-50%] top-[20%] ">
                <Player
                  className="w-40 h-40"
                  src={'/animation/rocket.json'}
                  autoplay
                  loop
                />
              </div>
            </div>
            <hr className="w-full bg-gray-100 h-1" />
            <div className="flex justify-between items-center p-3 gap-3">
              <div className="font-semibold">Total Harga</div>
              <div className="mr-1 font-bold text-xl">
                {manipulateMoney(calculateTotal())}
              </div>
            </div>
            <div className="p-3">
              <Button>Bayar</Button>
            </div>
          </div>
        </div>
      </InsideForm>
    </div>
  );
}
