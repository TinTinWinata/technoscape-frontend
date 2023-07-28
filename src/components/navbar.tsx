import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="p-2 bg-blue-500 text-white w-full">
      <Link className="mx-2" to="/home">
        Home
      </Link>
      <Link className="mx-2" to="/detail">
        Detail
      </Link>
      <Link className="mx-2" to="/">
        Login
      </Link>
    </div>
  );
}
