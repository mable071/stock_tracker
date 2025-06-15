import React, { useState, useEffect } from 'react';
import FormModal from '../FormModal';
import SubCategoryService from '../../../services/SubCategoryService';
import MainCategoryService from '../../../services/MainCategoryService';

const UpdateSubCategoryModal = ({ isOpen, onClose, onSuccess, subCategoryId }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    main_category_id: ''
  });
  const [mainCategories, setMainCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && subCategoryId) {
      fetchSubCategory();
      fetchMainCategories();
    }
  }, [isOpen, subCategoryId]);

  const fetchSubCategory = async () => {
    try {
      const response = await SubCategoryService.getSubCategoryById(subCategoryId);
      const subCategory = response.data;
      setFormData({
        name: subCategory.name,
        description: subCategory.description || '',
        main_category_id: subCategory.main_category_id
      });
    } catch (err) {
      setError('Failed to fetch subcategory details');
      console.error('Error fetching subcategory:', err);
    }
  };

  const fetchMainCategories = async () => {
    try {
      const response = await MainCategoryService.getAllMainCategories();
      setMainCategories(response.data);
    } catch (err) {
      setError('Failed to fetch main categories');
      console.error('Error fetching main categories:', err);
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
      await SubCategoryService.updateSubCategory(subCategoryId, formData);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update subcategory');
      console.error('Error updating subcategory:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Subcategory"
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

        <div>
          <label htmlFor="main_category_id" className="block text-sm font-medium text-gray-700">
            Main Category
          </label>
          <select
            id="main_category_id"
            name="main_category_id"
            value={formData.main_category_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Select a main category</option>
            {mainCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </FormModal>
  );
};

export default UpdateSubCategoryModal; 