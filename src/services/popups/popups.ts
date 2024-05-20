import { toast, ToastPosition } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const toastConfig = {
  position: 'top-center' as ToastPosition,
  hideProgressBar: true,
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    ...toastConfig,
    autoClose: 1000,
    className: 'custom-toast',
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    ...toastConfig,
    autoClose: 3000,
    className: 'custom-error-toast',
  });
};
