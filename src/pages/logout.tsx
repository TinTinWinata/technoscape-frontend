import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../hooks/user-context';

export default function Logout() {
  const { logout } = useUserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate('/login');
  }, []);
  return <div></div>;
}
