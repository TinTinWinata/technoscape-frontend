import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import VerificationInput from 'react-verification-input';
import Button, { ButtonType } from '../components/button';
import Modal, { IModalProps } from '../components/modal';
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

  const handleOnChange = (e: any) => {
    setValue(numberOnly(e));
  };

  const handleOnClick = () => {
    handleSuccess();
  };

  return (
    <Modal open={open} setOpen={setOpen}>
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
              Verify Your Account
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Please enter 6 digits pin that you have
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
                  length={6}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <Button onClick={handleOnClick} buttonType={ButtonType.Active}>
            CONFIRM
          </Button>
        </div>
      </>
    </Modal>
  );
}