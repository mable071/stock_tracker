import React, { useState, useEffect } from 'react';
import FormModal from '../FormModal';
import SupplierService from '../../../services/SupplierService';

const UpdateSupplierModal = ({ isOpen, onClose, onSuccess, supplierId }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact_email: '',
    contact_phone: '',
    address: '',
    is_active: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && supplierId) {
      fetchSupplier();
    }
  }, [isOpen, supplierId]);

  const fetchSupplier = async () => {
    try {
      const response = await SupplierService.getSupplierById(supplierId);
      const supplier = response.data;
      setFormData({
        name: supplier.name,
        contact_email: supplier.contact_email || '',
        contact_phone: supplier.contact_phone || '',
        address: supplier.address || '',
        is_active: supplier.is_active
      });
    } catch (err) {
      setError('Failed to fetch supplier details');
      console.error('Error fetching supplier:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await SupplierService.updateSupplier(supplierId, formData);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update supplier');
      console.error('Error updating supplier:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Supplier"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="contact_email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="contact_phone"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
            Active
          </label>
        </div>
      </div>
    </FormModal>
  );
};

export default UpdateSupplierModal; 