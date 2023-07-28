import { ChangeEvent, useEffect } from 'react';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../components/form';
import Input from '../components/input';
import useLoading from '../hooks/useLoading';
import { useUserAuth } from '../hooks/user-context';
import { IDetailResponse } from '../interfaces/backend/detail-response-interface';
import { endpoints } from '../settings/endpoint';
import Service from '../utils/service';

export default function ResetPassword() {
  const { id } = useParams();
  const { onStart, onFinish, onError } = useLoading();
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const validation = (newPassword: string, confirmPassword: string) =>
    newPassword === confirmPassword;

  useEffect(() => {
    checkId();
  }, [id]);

  const checkId = async () => {
    if (id) {
      const service = new Service();
      const response = await service.request<IDetailResponse>(
        endpoints.user.validateForgotPassword,
        undefined,
        { forgot_password_link_id: id }
      );
      console.log(response);
      if (response.isError) {
        // onError(data.detail);
        // console.log(data.detail);
        navigate('/login');
      }
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = e.target;
    onStart("Wait we're changing your password");
    if (!validation(newPassword.value, confirmPassword.value)) {
      onFinish('New password and confirm password is not same', false);
    } else if (!user) {
      onFinish('User not authenticated!', false);
      navigate('/login');
    } else {
      const service = new Service();
      const response = await service.request<IDetailResponse>(
        endpoints.user.changeForgotPassword,
        undefined,
        { password: newPassword.value, forgot_password_link_id: id }
      );
      if (!response.isError) {
        navigate('/login');
        onFinish(response.data as string, false);
      } else {
        const data = response.data as IDetailResponse;
        onFinish(data.detail, true);
      }
    }
  };
  return (
    <div className="">
      <Form
        title="Reset Password"
        subTitle="Create a new password that is at least 8 characters long and password must be alphanumberic."
        width="450"
        onSubmit={handleSubmit}
        buttonName="Submit"
      >
        <Input
          name="newPassword"
          label="Enter Your New Password"
          icon={<RiLockPasswordFill />}
          type="password"
        />
        <Input
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          icon={<RiLockPasswordFill />}
        />
      </Form>
    </div>
  );
}
