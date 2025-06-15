import React, { useState, useEffect } from 'react';
import FormModal from '../FormModal';
import PurchaseService from '../../../services/PurchaseService';
import ProductService from '../../../services/ProductService';
import SupplierService from '../../../services/SupplierService';

const AddPurchaseModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    product_id: '',
    supplier_id: '',
    quantity_received: '',
    cost_per_unit: ''
  });

  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isOpen) {
        try {
          const [productsResponse, suppliersResponse] = await Promise.all([
            ProductService.getAllProducts(),
            SupplierService.getAllSuppliers()
          ]);
          setProducts(productsResponse);
          setSuppliers(suppliersResponse);
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('Failed to fetch required data');
        }
      }
    };

    fetchData();
  }, [isOpen]);

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
      // Convert string values to appropriate types
      const submitData = {
        ...formData,
        quantity_received: parseInt(formData.quantity_received),
        cost_per_unit: parseFloat(formData.cost_per_unit)
      };

      await PurchaseService.createPurchase(submitData);
      
      // Reset form
      setFormData({
        product_id: '',
        supplier_id: '',
        quantity_received: '',
        cost_per_unit: ''
      });
      
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create purchase');
      console.error('Error creating purchase:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Purchase"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="product_id" className="block text-sm font-medium text-gray-700">
            Product <span className="text-red-500">*</span>
          </label>
          <select
            id="product_id"
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="supplier_id" className="block text-sm font-medium text-gray-700">
            Supplier
          </label>
          <select
            id="supplier_id"
            name="supplier_id"
            value={formData.supplier_id}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Select a supplier (optional)</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quantity_received" className="block text-sm font-medium text-gray-700">
              Quantity Received <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="quantity_received"
              name="quantity_received"
              value={formData.quantity_received}
              onChange={handleChange}
              required
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="cost_per_unit" className="block text-sm font-medium text-gray-700">
              Cost Per Unit <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="cost_per_unit"
              name="cost_per_unit"
              value={formData.cost_per_unit}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Display calculated total cost */}
        {formData.quantity_received && formData.cost_per_unit && (
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="text-sm font-medium text-gray-700">
              Total Cost: ${(parseFloat(formData.quantity_received) * parseFloat(formData.cost_per_unit)).toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </FormModal>
  );
};

export default AddPurchaseModal;