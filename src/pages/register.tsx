import { ChangeEvent } from 'react';
import { BsFillCreditCard2FrontFill } from 'react-icons/bs';
import { MdEmail, MdPerson } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Form from '../components/form';
import Input from '../components/input';
import RadioButton from '../components/radio-button';
import { useUserAuth } from '../hooks/user-context';
import { IRegisterForm } from '../interfaces/backend/register-form-interface';

export default function Register() {
  const { register } = useUserAuth();

  const handleRegister = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { ktpId, email, password, pin, gender, username } = e.target;
    const dataForm: IRegisterForm = {
      birthDate: '12121993',
      email: email.value,
      gender: gender.value === 'Male' ? '1' : '0',
      ktpId: ktpId.value,
      loginPassword: password.value,
      phoneNumber: '087878766892',
      pin: pin.value,
      username: username.value,
    };
    console.log(dataForm);
    await register(dataForm);
  };

  return (
    <div className="flex flex-col">
      <Form
        title="Create New Account"
        subTitle="Create your own credentials to access our application."
        width="450"
        onSubmit={handleRegister}
        buttonName="Create Account"
      >
        <Input
          icon={<MdPerson />}
          label="Enter your Username"
          type="text"
          name="username"
        />
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

        <RadioButton names={['Male', 'Female']} id="gender" />
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
