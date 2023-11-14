import { toast } from 'react-toastify';

type ToastMessageType = 'error' | 'info' | 'success';

export const toastMessage = (type: ToastMessageType, message: null | string) => {
  toast[type](message, {
    autoClose: 4000,
    closeOnClick: true,
    draggable: true,
    hideProgressBar: false,
    pauseOnHover: true,
    position: 'bottom-center',
    progress: undefined,
    theme: 'light',
  });
};
