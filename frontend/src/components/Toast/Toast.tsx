import React from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastifyContainer = () => (
  <ToastContainer
    position="top-center"
    autoClose={2000}
    hideProgressBar
    newestOnTop
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable={false}
    pauseOnHover
    theme="light"
    className="!p-0"
    toastClassName={() => 'relative flex p-0 min-h-0 rounded-md overflow-hidden bg-transparent shadow-md w-auto'}
    style={{ width: 'auto' }}
  />
);

const CloseButton = ({ closeToast }: { closeToast?: () => void }) => (
  <button onClick={closeToast} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-600 focus:outline-none">
    {React.createElement(IoMdClose, { className: 'w-5 h-5' })}
  </button>
);

const SuccessToastContent = ({ message }: { message: string }) => (
  <div className="flex items-center p-3 bg-green-50 border border-green-100 w-full rounded-md" style={{ minWidth: 'auto' }}>
    {React.createElement(FaCheckCircle, { className: 'w-5 h-5 text-green-500 mr-3 flex-shrink-0' })}
    <div className="text-green-800 font-medium">{message}</div>
  </div>
);

const ErrorToastContent = ({ message }: { message: string }) => (
  <div className="flex items-center p-3 bg-red-50 border border-red-100 w-full rounded-md" style={{ minWidth: 'auto' }}>
    {React.createElement(FaExclamationCircle, { className: 'w-5 h-5 text-red-500 mr-3 flex-shrink-0' })}
    <div className="text-red-800 font-medium">{message}</div>
  </div>
);

const defaultOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: false,
  closeButton: CloseButton,
  style: {
    width: '350px',
    minWidth: '350px',
  },
};

export const showSuccessToast = (message: string, options?: ToastOptions) => {
  return toast(React.createElement(SuccessToastContent, { message }), {
    ...defaultOptions,
    ...options,
  });
};

export const showErrorToast = (message: string, options?: ToastOptions) => {
  return toast(React.createElement(ErrorToastContent, { message }), {
    ...defaultOptions,
    ...options,
    closeButton: ({ closeToast }) => (
      <button onClick={closeToast} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 focus:outline-none">
        {React.createElement(IoMdClose, { className: 'w-5 h-5' })}
      </button>
    ),
  });
};
