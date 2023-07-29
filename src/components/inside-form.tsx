import { ChangeEvent } from 'react';
import { FcMultipleDevices } from 'react-icons/fc';
import Button, { ButtonType } from '../components/button';
import InsideLayout from './inside-layout';

export interface IInsideFormProps {
  onSubmit: (e: ChangeEvent<HTMLFormElement>) => void;
  children?: JSX.Element | JSX.Element[];
  title?: string;
  subTitle?: string;
  buttonTitle?: string;
}

export const InsideForm = ({
  onSubmit,
  children,
  title,
  subTitle,
  buttonTitle,
}: IInsideFormProps) => {
  return (
    <InsideLayout>
      <div className="w-[80%] bg-white d-flex rounded-2xl shadow-2xl p-8">
        <div className="w-full flex flex-row justify-between pb-4 border-b border-gray-500 border-opacity-20">
          <div>
            <p className="font-bold text-4xl text-font">{title}</p>
            <p className="mt-2 text-gray-500 font-secondaryFont">{subTitle}</p>
          </div>
          <div className="flex justify-center items-center">
            <FcMultipleDevices className="w-14 h-14 bg-green" />
          </div>
        </div>
        <form onSubmit={onSubmit}>
          {children}
          {buttonTitle && (
            <Button buttonType={ButtonType.Active} className="mt-4">
              {buttonTitle}
            </Button>
          )}
        </form>
      </div>
    </InsideLayout>
  );
};
