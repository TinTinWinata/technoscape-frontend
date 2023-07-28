import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="h-32 bg-primary z-0 absolute top-0 text-white w-full flex justify-center">
      <div className="mt-5 font-semibold text-center">
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
    </div>
  );
}
