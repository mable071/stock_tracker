import React from 'react';
import BaseModal from './BaseModal';

const FormModal = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  initialData = {},
  children,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {children}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {cancelLabel}
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default FormModal; 