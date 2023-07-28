import { useState } from 'react';
import type { Id } from 'react-toastify';
import { toast } from 'react-toastify';

const useLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let toastID: Id;
  const position = 'bottom-right';

  const onStart = (message: string, useToast: boolean = true): void => {
    setIsLoading(true);
    if (useToast)
      toastID = toast.loading(message, {
        position,
      });
  };

  const onFinish = (message: string, isSuccess: boolean = true): void => {
    setIsLoading(false);
    toast.update(toastID, {
      render: message,
      position,
      type: isSuccess ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
      isLoading: false,
      autoClose: 5000,
      draggable: true,
    });
  };

  const onSuccess = (val: string) => {
    toast.success(val, {
      isLoading: false,
      autoClose: 5000,
      draggable: true,
      position,
    });
  };

  const onError = (message: string, isAutoClose: boolean = false): void => {
    toast.error(message, {
      autoClose: isAutoClose ? 5000 : false,
      draggable: true,
      position,
    });
  };

  return { isLoading, onStart, onFinish, onError, onSuccess };
};

export default useLoading;
