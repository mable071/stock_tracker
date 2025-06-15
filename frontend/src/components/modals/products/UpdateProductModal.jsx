import React, { useState, useEffect } from 'react';
import FormModal from '../FormModal';
import ProductService from '../../../services/ProductService';
import SubCategoryService from '../../../services/SubCategoryService';

const UpdateProductModal = ({ isOpen, onClose, onSuccess, productId }) => {
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
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (isOpen && productId) {
      fetchProduct();
      fetchSubCategories();
    }
  }, [isOpen, productId]);

  const fetchProduct = async () => {
    try {
      const response = await ProductService.getProductById(productId);
      const product = response;
      console.log('product', product);
      
      setFormData(product);
      
    } catch (err) {
      setError('Failed to fetch product details');
      console.error('Error fetching product:', err);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await SubCategoryService.getAllSubCategories();
      setSubCategories(response);
    } catch (err) {
      console.error('Error fetching sub-categories:', err);
      setError('Failed to fetch sub-categories');
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.product_code.trim()) errors.product_code = 'Product code is required';
    if (!formData.sku.trim()) errors.sku = 'SKU is required';
    if (!formData.price || parseFloat(formData.price) <= 0) errors.price = 'Price must be greater than 0';
    if (!formData.cost_price || parseFloat(formData.cost_price) <= 0) errors.cost_price = 'Cost price must be greater than 0';
    if (!formData.stock_quantity || parseInt(formData.stock_quantity) < 0) errors.stock_quantity = 'Stock quantity must be 0 or greater';
    if (!formData.reorder_level || parseInt(formData.reorder_level) < 0) errors.reorder_level = 'Reorder level must be 0 or greater';
    if (!formData.unit.trim()) errors.unit = 'Unit is required';
    if (!formData.sub_category_id) errors.sub_category_id = 'Sub-category is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
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

      await ProductService.updateProduct(productId, submitData);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
      console.error('Error updating product:', err);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = (fieldName) => `
    w-full px-4 py-3 border rounded-lg transition-colors duration-200
    ${validationErrors[fieldName] 
      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
      : 'border-gray-300 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
    }
    focus:outline-none
  `;

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Product"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    >
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Basic Information
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses('name')}
              placeholder="Enter product name"
            />
            {validationErrors.name && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={inputClasses('description')}
              placeholder="Enter product description"
            />
          </div>
        </div>

        {/* Product Codes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Product Identification
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="product_code"
                value={formData.product_code}
                onChange={handleChange}
                className={inputClasses('product_code')}
                placeholder="e.g., PRD-001"
              />
              {validationErrors.product_code && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.product_code}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className={inputClasses('sku')}
                placeholder="e.g., ABC-123-XYZ"
              />
              {validationErrors.sku && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.sku}</p>
              )}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Pricing
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selling Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={inputClasses('price')}
                placeholder="0.00"
              />
              {validationErrors.price && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="cost_price"
                value={formData.cost_price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={inputClasses('cost_price')}
                placeholder="0.00"
              />
              {validationErrors.cost_price && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.cost_price}</p>
              )}
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Inventory
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleChange}
                min="0"
                className={inputClasses('stock_quantity')}
                placeholder="0"
              />
              {validationErrors.stock_quantity && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.stock_quantity}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reorder Level <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="reorder_level"
                value={formData.reorder_level}
                onChange={handleChange}
                min="0"
                className={inputClasses('reorder_level')}
                placeholder="0"
              />
              {validationErrors.reorder_level && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.reorder_level}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className={inputClasses('unit')}
                placeholder="e.g., pcs, kg, box"
              />
              {validationErrors.unit && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.unit}</p>
              )}
            </div>
          </div>
        </div>

        {/* Category & Status */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Category & Status
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub-Category <span className="text-red-500">*</span>
            </label>
            <select
              name="sub_category_id"
              value={formData.sub_category_id}
              onChange={handleChange}
              className={inputClasses('sub_category_id')}
            >
              <option value="">Select a sub-category</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
            {validationErrors.sub_category_id && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.sub_category_id}</p>
            )}
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-4 h-4 text-primary-600 bg-white border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label className="text-sm font-medium text-gray-700">
              Product is active and available for sale
            </label>
          </div>
        </div>
      </div>
    </FormModal>
  );
};

export default UpdateProductModal;