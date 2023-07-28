import { Player } from '@lottiefiles/react-lottie-player';
import Button from '../components/button';
import { InsideForm } from '../components/inside-form';
import Navbar from '../components/navbar';

export default function PayLoan() {
  const payLoan = () => {};

  return (
    <div className="w-full h-full relative">
      <Navbar />
      <InsideForm
        title="Bayar Peminjaman"
        subTitle="Pinjaman Cepat & Mudah untuk Kebutuhan Anda"
        onSubmit={payLoan}
      >
        <div className="flex pt-10">
          <div className="grow">
            <div className="flex justify-between px-3 pt-3">
              <div className="font-bold">Akun</div>
              <div className=""></div>
              <div className="font-bold text-green-400">23 Days Left</div>
            </div>
            <div className="flex justify-between px-3 pb-3">
              <div className="text-gray-500">5859457074850164</div>
              <div className=""></div>
              <div className="font-bold text-xl">Rp 65.000</div>
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
              <div className="mr-1 font-bold text-xl">Rp 65.000</div>
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
