import { Route, Routes } from 'react-router-dom';
import { useUserAuth } from '../hooks/user-context';
import { HomeAdmin } from '../pages/admin/home-admin';
import LoginPage from '../pages/login';
import NotFound from '../pages/not-found';

export default function AdminMiddlewareRoutes() {
  const { user } = useUserAuth();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login');
  //   }
  // }, []);
  if (!user) return <LoginPage></LoginPage>;

  return (
    <Routes>
      <Route path="/admin/home" element={<HomeAdmin />}></Route>
      <Route path="/*" element={<NotFound />}></Route>
    </Routes>
  );
}
