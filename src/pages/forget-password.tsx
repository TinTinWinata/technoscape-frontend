import { ChangeEvent } from 'react';
import { MdEmail } from 'react-icons/md';
import Form from '../components/form';
import Input from '../components/input';
import useLoading from '../hooks/useLoading';
import { IDetailResponse } from '../interfaces/backend/detail-response-interface';
import { endpoints } from '../settings/endpoint';
import Service from '../utils/service';

export default function ForgetPassword() {
  const { onStart, onFinish } = useLoading();
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    onFinish('Please wait sending email...');
    e.preventDefault();
    const { email } = e.target;
    const service = new Service();
    const data = {
      email: email.value,
    };
    const response = await service.request<IDetailResponse>(
      endpoints.user.forgotPassword,
      undefined,
      data
    );
    if (response.isError) {
      onFinish(response.data as string, false);
    } else {
      const data = response.data as IDetailResponse;
      onFinish(data.detail, true);
    }
  };
  return (
    <div className="">
      <Form
        title="Forgot Password"
        subTitle="Send your email and we’ll send you a link to reset a password."
        width="450"
        onSubmit={handleSubmit}
        buttonName="Submit"
      >
        <Input name="email" label="Enter Your Email" icon={<MdEmail />} />
      </Form>
    </div>
  );
}
