import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

type ContentLayout = {
  children?: JSX.Element;
};

export default function MainLayout({ children }: ContentLayout) {
  useLocation();
  return (
    <div className="w-full h-full bg-background full ">
      <div className="w-full h-full ">
        <ToastContainer />
        {/* {isNeedLayout() && <Navbar></Navbar>} */}
        <div className="w-full h-full center">{children}</div>
      </div>
    </div>
  );
}
