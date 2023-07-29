import { IChildrenProps } from '../../interfaces/children-interface';

export interface IHomeFilterIcon extends IChildrenProps {
  active?: boolean;
  onClick: () => void;
}

export default function HomeFilterIcon({
  onClick = () => {},
  children,
  active = false,
}: IHomeFilterIcon) {
  const getActiveClass = () =>
    active
      ? ' text-white bg-primary '
      : ' bg-white text-gray-400 border-gray-500 ';
  return (
    <div
      onClick={onClick}
      className={
        ' transition-all px-1 sm:px-2 cursor-pointer hover:text-white font-semibold hover:bg-primary center text-center text-sm  border rounded-md border-md hover:border-primary border-opacity-50  py-1 ' +
        getActiveClass()
      }
    >
      {children}
    </div>
  );
}
