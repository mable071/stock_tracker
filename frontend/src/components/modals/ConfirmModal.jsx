import React from 'react';
import BaseModal from './BaseModal';

const ConfirmModal = ({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
}) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="mt-2">
        <p className="text-sm text-gray-500">{message}</p>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {confirmLabel}
        </button>
      </div>
    </BaseModal>
  );
};

export default ConfirmModal; 