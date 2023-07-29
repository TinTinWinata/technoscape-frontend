import { SkeletonTheme } from 'react-loading-skeleton';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PinProvider } from '../hooks/pin-context';
import { IChildrenProps } from '../interfaces/children-interface';

export default function MainLayout({ children }: IChildrenProps) {
  useLocation();
  return (
    <div className="w-full h-full bg-background full ">
      <div className="w-full h-full ">
        <SkeletonTheme>
          <ToastContainer />
          {/* {isNeedLayout() && <Navbar></Navbar>} */}
          <PinProvider>
            <div className="w-full h-full center">{children}</div>
          </PinProvider>
        </SkeletonTheme>
      </div>
    </div>
  );
}
