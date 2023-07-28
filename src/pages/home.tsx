import { TransactoinHistory } from '../components/TransactionHistory';
import Greeting from '../components/greeting';
import Navbar from '../components/navbar';
import { usePin } from '../hooks/pin-context';
import { useUserAuth } from '../hooks/user-context';

export default function Home() {
  const { user } = useUserAuth();
  const { triggerPin } = usePin();
  return (
    <div className="w-full h-full relative">
      <Navbar />
      <div className="flex justify-center absolute top-20 w-full z-10 ">
        <div className="w-[80%] d-flex">
          <div className="w-full bg-white rounded-xl custom-shadow">
            <div className=" grid grid-cols-5 mt-8 w-[1600px]">
              <div className="font-bold bg-primary rounded-br-[50px] rounded-tr-[5px] rounded-l-xl text-white col-span-1">
                <div className="p-4">
                  <div className="h-5">
                    <Greeting />
                  </div>
                  <p className="text-2xl  font-normal">
                    Justine Winata Purwoko
                  </p>
                  <div className="relative  h-20 ">
                    <p className="text-normal absolute left-0 top-0">Rp</p>
                    <p className="indent-4 absolute top-[50%] translate-y-[-50%] left-5 text-3xl  font-bold">
                      30.000.000
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <form
                        onSubmit={(e: ChangeEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            triggerPin();
                        }}
                    >
                        <Button> test</Button>
                    </form> */}
          <div className="w-full grid grid-cols-3 gap-4 mt-8">
            <div className="col-span-2 bg-white shadow-lg p-6 rounded-lg">
              <p className="font-bold text-xl">Riwayat Transaksi</p>
              <TransactoinHistory
                amount={20000}
                createTime={1686725002}
                accountNo="5859457316649158"
                traxType="Transfer In"
                receiverNo="5859457969635008"
              />
              <TransactoinHistory
                amount={20000}
                createTime={1686725002}
                accountNo="5859457316649158"
                traxType="Transfer Out"
                receiverNo="5859457969635008"
              />
            </div>
            <div className="bg-white shadow-lg p-6">
              <p className="font-bold text-xl">Riwayat Peminjaman</p>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
