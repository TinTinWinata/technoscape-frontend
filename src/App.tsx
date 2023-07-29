import 'react-circular-progressbar/dist/styles.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { LoanProvider } from './hooks/loan-context';
import { UserProvider } from './hooks/user-context';
import MainLayout from './layouts/layout';
import MiddlewareRoutes from './middlewares/middleware-routes';
import ForgetPassword from './pages/forget-password';
import LoginPage from './pages/login';
import Logout from './pages/logout';
import Register from './pages/register';
import ResetPassword from './pages/reset-password';

function App() {
  return (
    <BrowserRouter>
      {/* Bundled with User Provider for getting user context (UserContext.tsx) */}
      <UserProvider>
        <LoanProvider>
          {/* Bundled with Main Layout (layout.tsx) */}
          <MainLayout>
            <Routes>
              <Route
                path="/forgot-password"
                element={<ForgetPassword></ForgetPassword>}
              ></Route>
              <Route
                path="/forgot-password/:id"
                element={<ResetPassword></ResetPassword>}
              ></Route>

              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<LoginPage></LoginPage>}></Route>
              <Route path="/logout" element={<Logout />}></Route>
              <Route
                path="/*"
                element={<MiddlewareRoutes></MiddlewareRoutes>}
              ></Route>
            </Routes>
          </MainLayout>
        </LoanProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
