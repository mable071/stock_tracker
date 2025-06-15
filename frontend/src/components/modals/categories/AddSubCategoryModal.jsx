import React, { useState, useEffect } from 'react';
import FormModal from '../FormModal';
import SubCategoryService from '../../../services/SubCategoryService';
import MainCategoryService from '../../../services/MainCategoryService';

const AddSubCategoryModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    main_category_id: '',
    is_active: true,
  });

  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const categories = await MainCategoryService.getAllCategories();
        setMainCategories(categories);
      } catch (error) {
        console.error('Error fetching main categories:', error);
      }
    };

    fetchMainCategories();
  }, []);

  const handleSubmit = async (e) => {
    try {
      await SubCategoryService.createSubCategory(formData);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error creating subcategory:', error);
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
      title="Add New Subcategory"
      onSubmit={handleSubmit}
      submitLabel="Add Subcategory"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="main_category_id" className="block text-sm font-medium text-gray-700">
            Main Category
          </label>
          <select
            name="main_category_id"
            id="main_category_id"
            value={formData.main_category_id}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            <option value="">Select a main category</option>
            {mainCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Subcategory Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
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

export default AddSubCategoryModal; 