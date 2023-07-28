import { useNavigate } from 'react-router-dom';

interface IHomeIconProps {
  color: string;
  icon: JSX.Element;
  name: string;
  link: string;
}

export default function HomeIcon({ link, color, icon, name }: IHomeIconProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(link);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-full flex flex-col justify-center items-center cursor-pointer"
    >
      <div className={`relative center w-[65px] h-[60px]`}>
        <div
          className={`abs-center left-0 w-[100%] h-[100%]  z-0 bg-primary  rounded-full bg-opacity-30`}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full z-10"></div>
        {icon}
      </div>
      <div className="center text-center font-semibold">{name}</div>
    </div>
  );
}
