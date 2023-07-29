import { ChangeEvent, useState } from 'react';
import { filterTextToNumberOnly } from '../utils/string-manipulation';

interface IRpInputProps {
  label: string;
  name: string;
}

export default function RpInput({ label, name }: IRpInputProps) {
  const [value, setValue] = useState<string>('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const numText = filterTextToNumberOnly(text);
    setValue(numText);
  };
  return (
    <div className="w-full">
      <label htmlFor="amount" className="font-bold text-font">
        {label}
      </label>
      <div className="mt-1 py-2 px-4 border rounded-md border-gray-500 border-opacity-30 relative h-10 w-full">
        <div className="absolute left-0 top-0 rounded-tl-md rounded-tr-xl rounded-br-3xl w-16 bg-primary h-full">
          <div className="abs-center font-semibold text-white text-lg">Rp</div>
        </div>
        <input
          onChange={onChange}
          value={value}
          name={name}
          type="text"
          className="w-[70%] sm:w-[90%] absolute focus:outline-none left-20"
        />
      </div>
    </div>
  );
}
