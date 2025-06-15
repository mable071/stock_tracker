import React, { useState, useEffect } from 'react';
import FormModal from '../FormModal';
import UserService from '../../../services/UserService';

const UpdateUserModal = ({ isOpen, onClose, onSuccess, userId }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    role: 'user',
    is_active: true,
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const user = await UserService.getCurrentUser(userId);
          setFormData({
            username: user.username || '',
            email: user.email || '',
            full_name: user.full_name || '',
            role: user.role || 'user',
            is_active: user.is_active ?? true,
          });
        } catch (error) {
          console.error('Error fetching user:', error);
          // Handle error (e.g., show error message)
        }
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    try {
      await UserService.updateUser(userId, formData);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error (e.g., show error message)
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Update User"
      onSubmit={handleSubmit}
      submitLabel="Update User"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            id="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_active"
            id="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
            Active
          </label>
        </div>
      </div>
    </FormModal>
  );
};

export default UpdateUserModal; 