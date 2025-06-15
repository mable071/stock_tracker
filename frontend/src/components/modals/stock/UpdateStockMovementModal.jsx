import React, { useState, useEffect } from 'react';
import FormModal from '../FormModal';
import StockMovementService from '../../../services/StockMovementService';
import ProductService from '../../../services/ProductService';

const UpdateStockMovementModal = ({ isOpen, onClose, onSuccess, movementId }) => {
  const [formData, setFormData] = useState({
    product_id: '',
    type: '',
    quantity: 1,
    reason: '',
    notes: ''
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movementResponse, productsResponse] = await Promise.all([
          StockMovementService.getMovementById(movementId),
          ProductService.getAllProducts()
        ]);
        
        const movement = movementResponse;
        setFormData({
          product_id: movement.product_id,
          type: movement.type,
          quantity: movement.quantity,
          reason: movement.reason,
          notes: movement.notes || ''
        });
        
        setProducts(productsResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (movementId) {
      fetchData();
    }
  }, [movementId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await StockMovementService.updateMovement(movementId, formData);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error updating stock movement:', error);
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
      title="Update Stock Movement"
      onSubmit={handleSubmit}
      submitLabel="Update Movement"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product</label>
          <select
            name="product_id"
            value={formData.product_id}
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
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="adjustment">Adjustment</option>
            <option value="damage">Damage</option>
            <option value="return">Return</option>
            <option value="transfer">Transfer</option>
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

export default UpdateStockMovementModal; 