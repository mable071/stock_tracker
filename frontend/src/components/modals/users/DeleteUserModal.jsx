import React from 'react';
import ConfirmModal from '../ConfirmModal';
import UserService from '../../../services/UserService';

const DeleteUserModal = ({ isOpen, onClose, onSuccess, userId, username }) => {
  const handleConfirm = async () => {
    try {
      await UserService.deleteUser(userId);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete User"
      message={`Are you sure you want to delete the user "${username}"? This action cannot be undone.`}
      onConfirm={handleConfirm}
      confirmLabel="Delete"
      cancelLabel="Cancel"
    />
  );
};

export default DeleteUserModal; 