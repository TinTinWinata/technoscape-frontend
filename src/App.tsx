import 'react-circular-progressbar/dist/styles.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { LoanProvider } from './hooks/loan-context';
import { UserProvider } from './hooks/user-context';
import MainLayout from './layouts/layout';
import ActivateProfile from './pages/activate-profile';
import { HomeAdmin } from './pages/admin/home-admin';
import ForgetPassword from './pages/forget-password';
import { LoanHistory } from './pages/history-loan';
import Home from './pages/home/home';
import Login from './pages/login';
import Logout from './pages/logout';
import PayLoan from './pages/pay-loan';
import Register from './pages/register';
import { RequestLoan } from './pages/request-loan';
import ResetPassword from './pages/reset-password';
import { Transfer } from './pages/transfer';

function App() {
  return (
    <BrowserRouter>
      {/* Bundled with User Provider for getting user context (UserContext.tsx) */}
      <UserProvider>
        <LoanProvider>
          {/* Bundled with Main Layout (layout.tsx) */}
          <MainLayout>
            <Routes>
              <Route path="/" element={<Login></Login>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/home" element={<Home></Home>}></Route>
              <Route path="/transfer" element={<Transfer />}></Route>
              <Route
                path="/forgot-password"
                element={<ForgetPassword></ForgetPassword>}
              ></Route>
              <Route
                path="/forgot-password/:id"
                element={<ResetPassword></ResetPassword>}
              ></Route>

              <Route
                path="/request-loan"
                element={<RequestLoan></RequestLoan>}
              ></Route>
              <Route path="/pay-loan" element={<PayLoan></PayLoan>}></Route>

              <Route
                path="/activate-profile"
                element={<ActivateProfile />}
              ></Route>
              <Route path="/register" element={<Register />}></Route>
              {/* <Route
              path="/*"
              element={<MiddlewareRoutes></MiddlewareRoutes>}
            ></Route> */}
              <Route path="/admin/home" element={<HomeAdmin />}></Route>
              <Route path="/loan-history" element={<LoanHistory />}></Route>
              <Route path="/logout" element={<Logout />}></Route>
            </Routes>
          </MainLayout>
        </LoanProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
