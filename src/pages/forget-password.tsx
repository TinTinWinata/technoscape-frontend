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
  };
  return (
    <div className="">
      <Form
        title="Lupa Pasword"
        subTitle="Kirimkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi."
        width="450"
        onSubmit={handleSubmit}
        buttonName="Kirim"
      >
        <Input name="email" label="Masukan email anda" icon={<MdEmail />} />
      </Form>
    </div>
  );
}
