interface IIconProps {
  children?: JSX.Element | JSX.Element[];
  name?: string;
}

export default function Icon({ children, name }: IIconProps) {
  return (
    <div className="w-32 h-32">
      <div className="center">{children}</div>
      <div className="center">{name}</div>
    </div>
  );
}
