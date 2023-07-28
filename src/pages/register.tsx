import { ChangeEvent } from 'react';
import { BsFillCreditCard2FrontFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/form';
import Input from '../components/input';
import RadioButton from '../components/radio-button';
import useLoading from '../hooks/useLoading';
import { useUserAuth } from '../hooks/user-context';
import { ILoginForm } from '../interfaces/user-interface';

export default function Register() {
  const { login } = useUserAuth();
  const { isLoading, onStart, onFinish } = useLoading();
  const navigate = useNavigate();

  const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = e.target;
    const dataForm: ILoginForm = {
      email: email.value,
      password: password.value,
    };
    await login(dataForm);
  };

  return (
    <div className="flex flex-col">
      <Form
        title="Create New Account"
        subTitle="Create your own credentials to access our application."
        width="450"
        onSubmit={handleLogin}
        buttonName="Create Account"
      >
        <Input
          icon={<MdEmail />}
          label="Enter your email"
          type="email"
          name="email"
        />
        <Input
          icon={<BsFillCreditCard2FrontFill />}
          label="Enter your KTP ID"
          type="text"
          name="ktpId"
        />
        <Input
          icon={<RiLockPasswordFill />}
          label="Enter your password"
          type="password"
          name="password"
        />
        <Input
          icon={<RiLockPasswordFill />}
          label="Enter your PIN number"
          type="password"
          name="pin"
        />
        <RadioButton names={['Male', 'Female']} />
      </Form>
      <div className="text-sm mt-5 center gap-1">
        <p className="text-secondaryFont">Already have account ?</p>
        <Link
          to="/login"
          className="text-primary curosr-pointer hover:underline"
        >
          go to the Login page
        </Link>
      </div>
    </div>
  );
}
