import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./hooks/user-context";
import MainLayout from "./layouts/layout";
import ForgetPassword from "./pages/forget-password";
import Home from "./pages/home/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { RequestLoan } from "./pages/request-loan";
import ResetPassword from "./pages/reset-password";
import { LoanProvider } from "./hooks/loan-context";

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
                            <Route
                                path="/login"
                                element={<Login></Login>}
                            ></Route>
                            <Route path="/home" element={<Home></Home>}></Route>
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

                            <Route
                                path="/register"
                                element={<Register />}
                            ></Route>
                            {/* <Route
              path="/*"
              element={<MiddlewareRoutes></MiddlewareRoutes>}
            ></Route> */}
                        </Routes>
                    </MainLayout>
                </LoanProvider>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
