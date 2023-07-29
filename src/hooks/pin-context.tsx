import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const expireTime = 15;
  const location = useLocation();
  const whitelistPath = ['/transfer', '/pay-loan'];

  useEffect(() => {
    if (time <= 0 && !success && open) {
      navigate(-1);
      restartState();
    }
  }, [time]);

  useEffect(() => {
    const { pathname } = location;
    if (!whitelistPath.includes(pathname)) {
      restartState();
    }
  }, [location]);

  const restartState = () => {
    setOpen(false);
    setSuccess(false);
  };

  useEffect(() => {
    document.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'i') {
        handleSuccess();
      }
    });
  });

  const triggerPin = () => {
    setTime(expireTime);
    const interval = setInterval(() => {
      setTime((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);
    setOpen(true);
    setTimeout(() => {
      restartState();
      clearInterval(interval);
    }, (expireTime + 100) * 1000);
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
