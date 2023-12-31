import { useEffect, useState } from 'react';

export default function ProgressBar({
  from,
  to,
}: {
  from: number;
  to: number;
}) {
  const [progress, setProgress] = useState<number>(0);
  const calculateProgress = () =>
    setProgress(() => {
      const value = Math.ceil((from / to) * 100);
      return value;
    });
  useEffect(() => calculateProgress(), [from, to]);
  return (
    <>
      <p className="mb-1 text-md text-gray-500 ">{`Question ${from} / ${to}`}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 ">
        <div
          style={{ width: `${progress}%` }}
          className={`transition-all bg-primary h-2.5 rounded-full`}
        ></div>
      </div>
    </>
  );
}
