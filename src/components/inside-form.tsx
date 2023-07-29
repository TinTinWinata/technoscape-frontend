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
      <div className="w-[80%] min-h-[80vh] bg-white flex flex-col rounded-2xl shadow-2xl p-8">
        <div className="w-full flex flex-row justify-between pb-4 border-b border-gray-500 border-opacity-20">
          <div>
            <p className="font-bold text-3xl text-font sm:text-4xl">{title}</p>
            <p className="mt-2 text-gray-500 sm:text-md text-sm font-secondaryFont">
              {subTitle}
            </p>
          </div>
          <div className="sm:flex justify-center items-center hidden">
            <FcMultipleDevices className="w-14 h-14 bg-green" />
          </div>
        </div>
        <form className="h-full flex flex-col" onSubmit={onSubmit}>
          {children}
          {buttonTitle && (
            <div className="grow flex flex-col justify-end ">
              <Button buttonType={ButtonType.Active} className="mb-2">
                {buttonTitle}
              </Button>
            </div>
          )}
        </form>
      </div>
    </InsideLayout>
  );
};
