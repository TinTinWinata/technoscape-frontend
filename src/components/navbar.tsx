import { Link } from 'react-router-dom';
import { useUserAuth } from '../hooks/user-context';

export default function Navbar() {
  const { logout } = useUserAuth();
  return (
    <div className="h-32 bg-primary z-0 absolute top-0 text-white w-full flex justify-center">
      <div className="mt-5 font-semibold text-center flex justify-center">
        <Link className="mx-2 hover:underline" to="/home">
          Home
        </Link>
        <div className="mx-2 cursor-pointer hover:underline" onClick={logout}>
          Logout
        </div>
        <Link className="mx-2 hover:underline" to="/">
          Login
        </Link>
      </div>
    </div>
  );
}
