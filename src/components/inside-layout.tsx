import { IChildrenProps } from '../interfaces/children-interface';

export default function InsideLayout({ children }: IChildrenProps) {
  return (
    <div className="h-fit flex max-w-screen-2xl  left-[50%] translate-x-[-50%] justify-center absolute  top-[75px] w-full z-10">
      {children}
    </div>
  );
}
