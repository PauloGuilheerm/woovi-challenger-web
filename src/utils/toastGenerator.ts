import {toast} from 'react-toastify';

export const toastGenerator = (type: string, message: string) => {
  switch (type) {
    case 'success':
      return toast.success(message);
    case 'error':
      return toast.error(message);
    case 'warning':
      return toast.warn(message);

    default:
  }
};