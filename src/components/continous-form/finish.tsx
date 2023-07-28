import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../hooks/user-context';
import { IFormAnswer } from '../../interfaces/form-answer-interface';
import { endpoints } from '../../settings/endpoint';
import { toastError, toastSuccess } from '../../settings/toast-setting';
import Service from '../../utils/service';

interface IFormFinishProps {
  answers: IFormAnswer[];
}

export default function Finish({ answers }: IFormFinishProps) {
  // const { data } = UseDiabetics(answers);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleBack = () => navigate('/home');
  const { user } = useUserAuth();
  const getLottieAsset = (): string => {
    if (success) {
      return '/animation/star.json';
    }
    return '/animation/loading.json';
  };
  const getLottieString = (): string => {
    if (!success) {
      return 'Sebentar kita melakukan check dalam jawaban anda!';
    }
    return 'Data mu telah tersimpan, sekarang kamu dapat melakukan request loan ';
  };
  const getLottieTitle = (): string => {
    if (!success) {
      return '';
    }
    return 'Aktivasi Akun Berhasil!';
  };

  interface IResultType {
    [key: string]: number;
  }

  const dataConverter = (answers: IFormAnswer[]) => {
    return answers.reduce((acc: IResultType, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {});
  };

  useEffect(() => {
    saveToDatabase();
  }, [answers]);

  const saveToDatabase = async () => {
    if (answers && user) {
      const data = dataConverter(answers);
      data.user_id = user.uid;
      const service = new Service();
      const request = await service.request<any>(
        endpoints.user.userApprove,
        undefined,
        data
      );
      if (request.success) {
        toastSuccess('Succesfully activated account');
      } else {
        toastError('Failed to activated account');
      }
    }
  };

  return (
    <>
      <div onClick={handleBack} className="relative w-fit flex cursor-pointer">
        <div className="center">
          <FaArrowLeft className="w-3 h-3 text-gray-500" />
        </div>
        <div className="ml-2 mt-2 text-gray-500 mb-2 text-sm">Back</div>
      </div>
      <hr />
      <div className="text-center  flex flex-col center w-full h-full">
        <Player className="w-52 h-52" src={getLottieAsset()} autoplay loop />
        <h3 className="font-semibold text-2xl ">{getLottieTitle()}</h3>
        <p className="mt-2 text-gray-500 ">{getLottieString()}</p>

        {/* Invicible Button */}
        <div className="h-16"></div>

        {/* Real Button */}
        <Link
          to="/home"
          className="absolute px-2 py-3 rounded-b-lg bottom-0 font-semibold bg-primary hover:bg-primary text-gray-50   transition-all w-full "
        >
          Home
        </Link>
      </div>
    </>
  );
}
