import { Player } from '@lottiefiles/react-lottie-player';
import {
  FcDebt,
  FcMoneyTransfer,
  FcMultipleDevices,
  FcPortraitMode,
  FcViewDetails,
} from 'react-icons/fc';
import Greeting from '../../components/greeting';
import { LoanProgress } from '../../components/loan-progress';
import Navbar from '../../components/navbar';
import { TransactionHistory } from '../../components/transaction-history';
import { usePin } from '../../hooks/pin-context';
import { useUserAuth } from '../../hooks/user-context';
import { convertSeparator } from '../../utils/string-manipulation';
import HomeIcon from './home-icon';

export default function Home() {
  const { user, bankInfo, transaction } = useUserAuth();
  const { triggerPin } = usePin();

  return (
    <div className="w-full h-full relative">
      <Navbar />
      <div className="flex justify-center absolute top-20 w-full z-10 ">
        <div className="w-[80%] d-flex relative z-10">
          <div className="absolute left-0 top-10 z-0 w-32 h-32 translate-y-[-100%]">
            <Player src={'/animation/dog.json'} autoplay loop />
          </div>
          <div className="w-full bg-white relative rounded-xl custom-shadow">
            <div className="flex">
              <div className="w-[350px] font-bold bg-primary rounded-br-[50px] rounded-tr-[5px] rounded-l-xl text-white col-span-1">
                <div className="p-4">
                  <div className="h-5">
                    <Greeting />
                  </div>
                  <p className="uppercase text-xl  font-normal">
                    {user?.username}
                  </p>
                  <div className="relative  h-20 ">
                    <p className="text-normal absolute left-0 top-0">Rp</p>
                    {bankInfo && (
                      <p className="indent-4 absolute top-[50%] translate-y-[-50%] left-5 text-3xl  font-bold">
                        {convertSeparator(bankInfo.balance.toString())}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-5 center grow  ">
                <div className="center w-full ">
                  <HomeIcon
                    link="/transfer"
                    color="green"
                    icon={
                      <FcMoneyTransfer className="w-full absolute z-10 h-full" />
                    }
                    name="Transfer"
                  />
                  <HomeIcon
                    link="/request-loan"
                    color="red"
                    icon={
                      <FcMultipleDevices className="w-full absolute z-10 h-full" />
                    }
                    name="Peminjaman"
                  />
                  <HomeIcon
                    link="/history-loan"
                    color="red"
                    icon={
                      <FcViewDetails className="w-full absolute z-10 h-full" />
                    }
                    name="Riwayat Peminjaman"
                  />
                  <HomeIcon
                    link="/pay-loan"
                    color="blue"
                    icon={<FcDebt className="w-full absolute z-10 h-full" />}
                    name="Bayar Peminjaman"
                  />
                  {user && !user.is_approved && (
                    <HomeIcon
                      link="/activate-profile"
                      color="blue"
                      icon={
                        <FcPortraitMode className="w-full absolute z-10 h-full" />
                      }
                      name="Validasi Akun"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-3 gap-4 mt-8">
            <div className="col-span-2 bg-white shadow-lg p-6 rounded-lg">
              <p className="font-bold text-2xl">Riwayat Transaksi</p>
              <hr className="my-3" />
              {transaction ? (
                transaction?.transactions.map((transaction, index: number) => (
                  <TransactionHistory
                    key={index}
                    amount={transaction.amount}
                    createTime={transaction.transactionDate}
                    accountNo={transaction.senderAccountNo}
                    traxType={transaction.traxType}
                    receiverNo={transaction.receiverAccountNo}
                  />
                ))
              ) : (
                <div className="center">
                  <p className="text-gray-500 text-center">
                    Anda belum memiliki transaksi
                  </p>
                </div>
              )}
            </div>
            <div className="bg-white shadow-lg p-6 flex flex-col">
              <p className="font-bold text-2xl mt-3 text-center">Peminjaman</p>
              <div className="center">
                <hr className="mt-3 w-2/3 mb-2" />
              </div>
              <LoanProgress />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
