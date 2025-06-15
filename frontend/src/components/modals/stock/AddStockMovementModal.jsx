import React, { useState, useEffect } from 'react';
import FormModal from '../FormModal';
import StockMovementService from '../../../services/StockMovementService';
import ProductService from '../../../services/ProductService';

const AddStockMovementModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    product_id: '',
    type: 'in',
    quantity: 1,
    reason: '',
    notes: ''
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAllProducts();
        setProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await StockMovementService.createMovement(formData);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error creating stock movement:', error);
      // Handle error (e.g., show error message)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Stock Movement"
      onSubmit={handleSubmit}
      submitLabel="Create Movement"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product</label>
          <select
            name="product_id"
            value={formData.productId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Movement Type</label>
          <select
            name="type"
            value={formData.movementType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="in">In</option>
            <option value="out">Out</option>
            
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Reason</label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </FormModal>
  );
};

export default AddStockMovementModal; 