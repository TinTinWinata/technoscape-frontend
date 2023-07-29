import { IChildrenProps } from '../interfaces/children-interface';

export default function InsideLayout({ children }: IChildrenProps) {
  return (
    <div className="flex max-w-screen-2xl  left-[50%] translate-x-[-50%] justify-center absolute  top-20 w-full z-10">
      {children}
    </div>
  );
}
