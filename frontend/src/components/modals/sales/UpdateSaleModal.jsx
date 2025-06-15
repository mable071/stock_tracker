import React, { useState, useEffect } from 'react';
import FormModal from '../FormModal';
import SaleService from '../../../services/SaleService';
import ProductService from '../../../services/ProductService';

const UpdateSaleModal = ({ isOpen, onClose, onSuccess, saleId }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    saleDate: '',
    status: '',
    items: [],
    notes: ''
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [saleResponse, productsResponse] = await Promise.all([
          SaleService.getSaleById(saleId),
          ProductService.getAllProducts()
        ]);
        
        const sale = saleResponse;
        setFormData({
          customerName: sale.customerName,
          saleDate: sale.saleDate.split('T')[0],
          status: sale.status,
          items: sale.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice
          })),
          notes: sale.notes || ''
        });
        
        setProducts(productsResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (saleId) {
      fetchData();
    }
  }, [saleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await SaleService.updateSale(saleId, formData);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error updating sale:', error);
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

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { productId: '', quantity: 1, unitPrice: 0 }]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Sale"
      onSubmit={handleSubmit}
      submitLabel="Update Sale"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sale Date</label>
          <input
            type="date"
            name="saleDate"
            value={formData.saleDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Items</label>
          {formData.items.map((item, index) => (
            <div key={index} className="mt-2 flex items-center space-x-2">
              <select
                value={item.productId}
                onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select Product</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                min="1"
                className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
              <input
                type="number"
                value={item.unitPrice}
                onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                min="0"
                step="0.01"
                className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
          >
            + Add Item
          </button>
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

export default UpdateSaleModal; 