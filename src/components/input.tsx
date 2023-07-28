interface IInputProps {
  label: string;
  name: string;
  disabled?: boolean;
  type?: string;
  icon?: JSX.Element;
  defaultValue?: string;
}

export default function Input({
  defaultValue,
  label,
  name,
  disabled = false,
  type,
  icon,
}: IInputProps) {
  return (
    <div className="w-full h-10 relative px-3 py-2 border border-border border-opacity-20 rounded-md">
      <div className="absolute left-2 text-primary top-[50%] translate-y-[-50%]">
        {icon && icon}
      </div>
      <input
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`absolute top-[50%] left-[10%] translate-y-[-50%] text-sm w-[90%] focus:none focus:outline-none  rounded`}
        name={name}
        placeholder={label}
      ></input>
    </div>
  );
}
