import { ChangeEvent } from 'react';
import { MdPerson } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/form';
import Input from '../components/input';
import useLoading from '../hooks/useLoading';
import { useUserAuth } from '../hooks/user-context';
import { ILoginForm } from '../interfaces/backend/login-form-interface';

export default function Login() {
  const { login } = useUserAuth();
  const { isLoading, onStart, onFinish } = useLoading();
  const navigate = useNavigate();

  const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password } = e.target;
    const dataForm: ILoginForm = {
      loginPassword: password.value,
      username: username.value,
    };
    await login(dataForm);
  };

  return (
    <div className="flex flex-col">
      <Form
        title="Welcome Back"
        subTitle="Enter your credentials to access your account."
        width="450"
        onSubmit={handleLogin}
        buttonName="Sign In"
      >
        <Input
          icon={<MdPerson />}
          label="Enter your username"
          type="text"
          name="username"
        />
        <Input
          icon={<RiLockPasswordFill />}
          label="Enter your password"
          type="password"
          name="password"
        />
      </Form>
      <div className="text-sm mt-5 center gap-1">
        <p className="text-secondaryFont">Forgot your password ?</p>
        <Link
          to="/forgot-password"
          className="text-primary curosr-pointer hover:underline"
        >
          Reset Password
        </Link>
      </div>
    </div>
  );
}
