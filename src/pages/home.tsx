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
        <div className="w-[80%] ">
          <div className="w-full p-4 bg-white rounded-md shadow-lg">
            Justine
          </div>
        </div>
      </div>
    </div>
  );
}
