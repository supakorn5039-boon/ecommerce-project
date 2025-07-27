import React from 'react';
import ButtonCustom from '../button/ButtonCustom';

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  ReConfirm?: string;
  loading?: boolean;
  remove?: boolean;
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  ReConfirm,
  onConfirm,
  loading = false,
  onCancel,
  remove = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden shadow-xl">
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          <p className="text-gray-600 mb-4">{message}</p>

          {ReConfirm && <p className="text-gray-600 mb-4">{ReConfirm}</p>}

          <div className="flex justify-end gap-3">
            <ButtonCustom
              onClick={onCancel}
              label={'Cancle'}
              className="w-[120px] border border-gray-300 text-gray-700 hover:bg-gray-50"
              bgColor="bg-white"
              labelClassName="text-gray-700"
              disabled={loading}
            />
            <ButtonCustom
              onClick={onConfirm}
              label={'Confirm'}
              className="w-[120px] hover:bg-red-700"
              bgColor="bg-red-600"
              labelClassName="text-white"
              isLoading={loading}
              remove={remove}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
