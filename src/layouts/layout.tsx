import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PinProvider } from '../hooks/pin-context';
import { IChildrenProps } from '../interfaces/children-interface';

export default function MainLayout({ children }: IChildrenProps) {
  useLocation();
  return (
    <div className="w-full h-full bg-background full ">
      <div className="w-full h-full ">
        <ToastContainer />
        {/* {isNeedLayout() && <Navbar></Navbar>} */}
        <PinProvider>
          <div className="w-full h-full center">{children}</div>
        </PinProvider>
      </div>
    </div>
  );
}
