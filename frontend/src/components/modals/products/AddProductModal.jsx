import React, { useState, useEffect } from 'react';
import FormModal from '../FormModal';
import ProductService from '../../../services/ProductService';
import SubCategoryService from '../../../services/SubCategoryService';

const AddProductModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    product_code: '',
    sku: '',
    price: '',
    cost_price: '',
    stock_quantity: '',
    unit: '',
    reorder_level: '',
    sub_category_id: '',
    is_active: true
  });
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchSubCategories();
    }
  }, [isOpen]);

  const fetchSubCategories = async () => {
    try {
      const response = await SubCategoryService.getAllSubCategories();
      setSubCategories(response);
    } catch (err) {
      console.error('Error fetching sub-categories:', err);
      setError('Failed to fetch sub-categories');
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
      // Convert numeric fields
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        cost_price: parseFloat(formData.cost_price),
        stock_quantity: parseInt(formData.stock_quantity),
        reorder_level: parseInt(formData.reorder_level),
        sub_category_id: formData.sub_category_id
      };

      await ProductService.createProduct(submitData);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
      console.error('Error creating product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Product"
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="product_code" className="block text-sm font-medium text-gray-700">
              Product Code *
            </label>
            <input
              type="text"
              id="product_code"
              name="product_code"
              value={formData.product_code}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
              SKU *
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="cost_price" className="block text-sm font-medium text-gray-700">
              Cost Price *
            </label>
            <input
              type="number"
              id="cost_price"
              name="cost_price"
              value={formData.cost_price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700">
              Stock Quantity *
            </label>
            <input
              type="number"
              id="stock_quantity"
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="reorder_level" className="block text-sm font-medium text-gray-700">
              Reorder Level *
            </label>
            <input
              type="number"
              id="reorder_level"
              name="reorder_level"
              value={formData.reorder_level}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
            Unit *
          </label>
          <input
            type="text"
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
            placeholder="e.g., pcs, kg, box"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="sub_category_id" className="block text-sm font-medium text-gray-700">
            Sub-Category *
          </label>
          <select
            id="sub_category_id"
            name="sub_category_id"
            value={formData.sub_category_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Select a sub-category</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.name} - {subCategory.id}
              </option>
            ))}
          </select>
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

export default AddProductModal; 