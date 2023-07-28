import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILoginForm } from '../interfaces/backend/login-form-interface';
import { IRegisterForm } from '../interfaces/backend/register-form-interface';
import { ISession } from '../interfaces/user-interface';
import { endpoints } from '../settings/endpoint';
import {
  toastLoading,
  toastUpdateFailed,
  toastUpdateSuccess,
} from '../settings/toast-setting';
import Service from '../utils/service';
import useLoading from './useLoading';

interface IUserContext {
  logout: () => void;
  login: (form: ILoginForm) => Promise<void>;
  isAuth: () => boolean;
  user: ISession | null;
  register: (form: IRegisterForm) => Promise<void>;
  fetchUser: () => Promise<void>;
}

const userContext = createContext({} as IUserContext);

type ContentLayout = {
  children: JSX.Element;
};

export function UserProvider({ children }: ContentLayout) {
  const [user, setUser] = useState<ISession | null>(null);
  const { onStart, onFinish } = useLoading();
  const navigate = useNavigate();
  const service: Service = new Service(undefined, true);

  function isAuth() {
    return user === undefined || user === null || user === undefined;
  }

  useEffect(() => checkStorage(), []);

  const register = async (form: IRegisterForm): Promise<void> => {
    const toastId = toastLoading('We creating your account');
    const response = await service.request<any>(
      endpoints.auth.register,
      undefined,
      form
    );
    if (response.success) {
      toastUpdateSuccess(toastId, 'Succesfuly register account');
      navigate('/login');
    } else {
      toastUpdateFailed(toastId, response.errorMessage);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const login = async (form: ILoginForm): Promise<void> => {
    const toastId = toastLoading('We were signing you up');
    const response = await service.request<ISession>(
      endpoints.auth.login,
      '',
      form
    );
    if (response.success) {
      saveToStorage(response.data);
      toastUpdateSuccess(toastId, 'Succesfully Login');
      navigate('/home');
    } else {
      toastUpdateFailed(toastId, response.errorMessage);
    }
  };

  const checkStorage = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr) as ISession);
    }
  };
  const saveToStorage = (user: ISession) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const fetchUser = async (): Promise<void> => {
    const response = await service.request<ISession>(
      endpoints.user.getProfileUser
    );
    // if (!response.isError) setUser(response.data as ISession);
  };

  return (
    <userContext.Provider
      value={{ logout, register, login, user, isAuth, fetchUser }}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userContext);
}
