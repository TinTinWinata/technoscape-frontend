import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Skeleton from 'react-loading-skeleton';
import Dog from '../../components/dog';
import Greeting from '../../components/greeting';
import InsideLayout from '../../components/inside-layout';
import { LoanProgress } from '../../components/loan-progress';
import Navbar from '../../components/navbar';
import { TransactionHistory } from '../../components/transaction-history';
import { useLoan } from '../../hooks/loan-context';
import { useUserAuth } from '../../hooks/user-context';
import { IBackendAccount } from '../../interfaces/bank-account-interface';
import { convertSeparator } from '../../utils/string-manipulation';
import HomeFilter from './home-filter';
import HomeIconContainer from './home-icon-container';

export default function Home() {
  const { transactionLoading, user, bankInfo, transaction, accountLoading } =
    useUserAuth();

  const { loan, isLoading: loanLoading } = useLoan();

  const [showBalace, setShowBalance] = useState<boolean>(false);

  const toggleBalance = () => {
    setShowBalance(!showBalace);
  };

  return (
    <div className="w-full h-full ">
      <Navbar />
      <InsideLayout>
        <div className="w-[80%] h-fit d-flex relative z-10">
          <Dog />
          <div className="w-full  bg-white  h-[170px] lg:h-fit relative rounded-xl custom-shadow">
            <div className="flex h-fit">
              <div className="w-full lg:w-[350px] h-fit  overflow:hidden font-bold bg-primary rounded-br-lg lg:rounded-br-[50px] rounded-tr-[5px] rounded-l-xl text-white col-span-1">
                <div className="p-4 w-[1000px]  lg:w-[350px]">
                  <div className="h-5 hidden lg:block">
                    <Greeting />
                  </div>
                  <p className="uppercase text-xl  font-normal">
                    {user?.username}
                  </p>
                  <div className="relative  h-20 ">
                    <p className="text-normal absolute left-0 top-0">Rp</p>
                    {bankInfo && showBalace ? (
                      <div className="indent-4 absolute top-[50%] translate-y-[-50%] left-5 text-3xl  font-bold min-w-[250px] flex flex-row items-center justify-between">
                        <p>{convertSeparator(bankInfo.balance.toString())}</p>
                        <AiFillEyeInvisible
                          onClick={toggleBalance}
                          size={24}
                          className="text-white z-20 cursor-pointer"
                        />
                      </div>
                    ) : (
                      <div className="indent-4 absolute top-[50%] translate-y-[-50%] left-5 text-3xl  font-bold min-w-[250px] flex flex-row items-center justify-between">
                        <p>********</p>
                        <AiFillEye
                          onClick={toggleBalance}
                          size={24}
                          className="text-white z-20 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex ">
                    <div className="mt-2 font-semibold center h-fit">
                      Account
                    </div>
                    {!accountLoading ? (
                      <div className="center ml-2 mt-2">
                        {bankInfo?.accountNo}
                      </div>
                    ) : (
                      <div className="lg:visible invisible w-full mt-2 ml-2">
                        <Skeleton count={1} height="50" width="80%" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="invisible lg:visible p-5 center grow  ">
                <HomeIconContainer />
              </div>
            </div>
          </div>
          <div className="mt-6 shadow-lg p-6 rounded-lg visible lg:invisible block lg:hidden">
            <HomeIconContainer />
          </div>
          <div className="w-full  flex flex-col lg:grid lg:grid-cols-3 gap-4 mt-8 min-h-[400px]">
            <div className="col-span-2 bg-white shadow-lg p-6 rounded-lg">
              {transactionLoading ? (
                <>
                  <div>
                    <Skeleton count={1} height={50} />
                    <Skeleton count={2} height={150} />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full flex justify-between">
                    <p className="font-bold text-2xl">Riwayat Transaksi</p>
                    <HomeFilter defaultValue={transaction?.filter} />
                  </div>
                  <hr className="my-3" />
                  {transaction ? (
                    transaction.transactions.map(
                      (transaction, index: number) => {
                        const current: IBackendAccount =
                          transaction.traxType === 'Transfer masuk'
                            ? transaction.senderAccountInfo
                            : transaction.receiverAccountInfo;
                        console.log('current : ', current);
                        if (current)
                          return (
                            <TransactionHistory
                              key={index}
                              amount={transaction.amount}
                              createTime={transaction.transactionDate}
                              accountNo={current.accountNo}
                              traxType={transaction.traxType}
                              receiverNo={current.accountName}
                            />
                          );
                        return <div key={index}></div>;
                      }
                    )
                  ) : (
                    <div className="center h-full">
                      <p className="text-gray-500 text-center mb-20">
                        Anda belum memiliki transaksi
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="mb-10 lg:mb-0 bg-white shadow-lg p-6 flex flex-col">
              {!loanLoading && (
                <>
                  <p className="font-bold text-2xl mt-3 text-center">
                    Peminjaman
                  </p>
                  <div className="center">
                    <hr className="mt-3 w-2/3 mb-2" />
                  </div>
                </>
              )}
              <LoanProgress />
            </div>
          </div>
        </div>
      </InsideLayout>
    </div>
  );
}
