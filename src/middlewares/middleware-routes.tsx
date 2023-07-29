import { Route, Routes } from 'react-router-dom';
import { useUserAuth } from '../hooks/user-context';
import ActivateProfile from '../pages/activate-profile';
import { LoanHistory } from '../pages/history-loan';
import Home from '../pages/home/home';
import LoginPage from '../pages/login';
import PayLoan from '../pages/pay-loan';
import { RequestLoan } from '../pages/request-loan';
import { Transfer } from '../pages/transfer';
import AdminMiddlewareRoutes from './admin-routes';

export default function MiddlewareRoutes() {
  const { user } = useUserAuth();
  if (!user) return <LoginPage></LoginPage>;

  return (
    <Routes>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/transfer" element={<Transfer />}></Route>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/history-loan" element={<LoanHistory />}></Route>
      <Route path="/activate-profile" element={<ActivateProfile />}></Route>
      <Route path="/request-loan" element={<RequestLoan></RequestLoan>}></Route>
      <Route path="/pay-loan" element={<PayLoan></PayLoan>}></Route>
      <Route path="/*" element={<AdminMiddlewareRoutes />} />
    </Routes>
  );
}
