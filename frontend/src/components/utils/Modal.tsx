import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onClose: (close: boolean) => void;
  children: React.ReactNode;
  title: string | React.ReactNode;
  className?: string;
  size?: string;
  titleStyle?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, size = '', className, titleStyle }) => {
  const responsiveSizeClass = size ? `w-full ${size}` : 'w-full max-w-4xl';

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className={`relative transform rounded-lg text-left shadow-xl transition-all
                        data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200
                        data-[enter]:ease-out data-[leave]:ease-in sm:my-8 ${responsiveSizeClass}
                        data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 ${className}
                        `}
          >
            <div>
              <div className="flex bg-[#0000000a] px-4 py-5 sm:p-6">
                <div className={'flex w-3/4'}>
                  <DialogTitle className={`text-xl font-semibold  ${titleStyle}`}>{title}</DialogTitle>
                </div>
                <div className={`flex w-1/4 justify-end `}>
                  <button onClick={() => onClose(false)} type="button">
                    <IoMdClose />
                  </button>
                </div>
              </div>
              <div className="flex px-6 pt-2 pb-6">
                <div className="w-full">
                  <div className="mt-2">{children}</div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
