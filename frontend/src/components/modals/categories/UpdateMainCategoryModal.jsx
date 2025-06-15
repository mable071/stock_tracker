import React, { useState, useEffect } from 'react';
import FormModal from '../FormModal';
import MainCategoryService from '../../../services/MainCategoryService';

const UpdateMainCategoryModal = ({ isOpen, onClose, onSuccess, mainCategoryId }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && mainCategoryId) {
      fetchMainCategory();
    }
  }, [isOpen, mainCategoryId]);

  const fetchMainCategory = async () => {
    try {
      const response = await MainCategoryService.getMainCategoryById(mainCategoryId);
      const mainCategory = response.data;
      setFormData({
        name: mainCategory.name,
        description: mainCategory.description || ''
      });
    } catch (err) {
      setError('Failed to fetch main category details');
      console.error('Error fetching main category:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await MainCategoryService.updateMainCategory(mainCategoryId, formData);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update main category');
      console.error('Error updating main category:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Main Category"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </FormModal>
  );
};

export default UpdateMainCategoryModal; 