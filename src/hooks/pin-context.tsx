import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinModal from '../components/pin-modal';
import { IChildrenProps } from '../interfaces/children-interface';

interface IPinContext {
  triggerPin: () => void;
}
const pinContext = createContext({} as IPinContext);

export function PinProvider({ children }: IChildrenProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const [time, setTime] = useState<number>(0);
  const expireTime = 100;

  const triggerPin = () => {
    setTime(expireTime);
    const interval = setInterval(() => {
      setTime((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);
    setOpen(true);
    setTimeout(() => {
      if (success) {
        // Success
      } else {
        navigate(-1);
        // Tidak success
      }
      setOpen(false);
      clearInterval(interval);
    }, expireTime * 1000);
  };

  const handleSuccess = () => {
    setOpen(false);
    setSuccess(true);
  };

  return (
    <pinContext.Provider value={{ triggerPin }}>
      <>
        <PinModal
          time={time}
          handleSuccess={handleSuccess}
          open={open}
          setOpen={setOpen}
        ></PinModal>
        {children}
      </>
    </pinContext.Provider>
  );
}

export function usePin() {
  return useContext(pinContext);
}
