import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import VerificationInput from 'react-verification-input';
import Button, { ButtonType } from '../components/button';
import Modal, { IModalProps } from '../components/modal';
import { useUserAuth } from '../hooks/user-context';
import { endpoints } from '../settings/endpoint';
import { toastError } from '../settings/toast-setting';
import Service from '../utils/service';
import { numberOnly } from '../utils/validator';

export interface IPinModalProps extends IModalProps {
  handleSuccess: () => void;
  time: number;
}

export default function PinModal({
  open,
  setOpen,
  time,
  handleSuccess,
}: IPinModalProps) {
  const [value, setValue] = useState<string>('');
  const { user } = useUserAuth();
  const pinLength = 6;
  const location = useLocation();

  useEffect(() => {
    setValue('');
  }, [location]);

  const handleOnChange = (e: any) => {
    const temp = numberOnly(e);
    setValue(temp);
    if (temp.length === pinLength) {
      handleOnClick(temp);
    }
  };

  const handleOnClick = async (val?: string) => {
    if (user) {
      const data = {
        user_id: user.uid,
        pin: val ? val : value,
      };
      const service = new Service();
      const response = await service.request<any>(
        endpoints.user.pinVerification,
        undefined,
        data
      );
      if (response.success) {
        handleSuccess();
      } else {
        toastError(response.errorMessage);
      }
    }
  };

  return (
    <Modal open={open}>
      <>
        <div>
          {/* <div className="center mb-6 mt-3">
            <img src="/logo-2.png" className="w-40" alt="" />
          </div> */}
          <div className="text-center sm:mt-5">
            <Dialog.Title
              as="h3"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              Verifikasi akun Anda
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Masukkan 6 digit pin yang Anda miliki
              </p>
              <p className="text-sm">{`This page will be expired in ${time} seconds`}</p>
              <div className="mt-10 mb-10 center">
                <VerificationInput
                  classNames={{
                    container: 'react-verification-container',
                    character: 'react-verification-character',
                    characterInactive: 'react-verification-character--inactive',
                    characterSelected: 'react-verification-character--selected',
                  }}
                  onChange={handleOnChange}
                  value={value}
                  length={pinLength}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <Button onClick={handleOnClick} buttonType={ButtonType.Active}>
            Konfirmasi
          </Button>
        </div>
      </>
    </Modal>
  );
}
