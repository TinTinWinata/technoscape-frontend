import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBackendInterface } from '../interfaces/backend/backend-response-interface';
import { IRegisterForm } from '../interfaces/backend/register-form-interface';
import { ILoginForm, ISession } from '../interfaces/user-interface';
import { endpoints } from '../settings/endpoint';
import Service from '../utils/service';
import useLoading from './useLoading';

interface IUserContext {
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
    onStart('We creating your account');
    const response = await service.request<IBackendInterface<any>>(
      endpoints.auth.register,
      undefined,
      form
    );
    if (response.success) {
      onFinish('Succesfuly register account', true);
      navigate('/home');
    } else {
      onFinish(response.errorMessage, false);
    }
  };

  const login = async (form: ILoginForm): Promise<void> => {
    const response = await service.request<ISession>(
      endpoints.auth.login,
      '',
      form
    );
    onStart("We're signed in you up...");
    // if (!response.isError) {
    //   setUser(response.data);
    //   saveToStorage(response.data);
    //   onFinish('Successfully Logged In', !response.isError);
    //   navigate('/home');
    // } else {
    //   //   onFinish(response.data as string, false);
    // }

    // return response;
  };

  const checkStorage = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr) as ISession);
    }
  };
  const saveToStorage = (user: ISession) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const fetchUser = async (): Promise<void> => {
    const response = await service.request<ISession>(
      endpoints.user.getProfileUser
    );
    // if (!response.isError) setUser(response.data as ISession);
  };

  return (
    <userContext.Provider value={{ register, login, user, isAuth, fetchUser }}>
      {children}
    </userContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userContext);
}
